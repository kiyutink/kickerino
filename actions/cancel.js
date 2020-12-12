const api = require("../lib/api");
const gameOverTemplate = require("../lib/game_over_template");

module.exports = async ({ ack, client }) => {
  await ack();
  const activeGame = await api.getActiveGame();
  if (!activeGame) {
    return;
  }

  const activeGameData = activeGame.data();
  if (activeGameData.winnerMessageTs) {
    if (activeGameData.winner) {
      await client.chat.update({
        ts: activeGameData.winnerMessageTs,
        channel: activeGameData.slackChannelId,
        blocks: gameOverTemplate(activeGameData[activeGameData.winner], false),
      });
    } else {
      await client.chat.delete({
        ts: activeGameData.winnerMessageTs,
        channel: activeGameData.slackChannelId,
      });
    }
  }

  if (activeGameData.winner) {
    await client.chat.update({
      ts: activeGameData.winnerMessageTs,
      channel: activeGameData.slackChannelId,
      blocks: gameOverTemplate(activeGameData[activeGameData.winner], false),
    });
  } else {
    await client.chat.delete({
      ts: activeGameData.messageTs,
      channel: activeGameData.slackChannelId,
    });
  }

  await api.updateGame(activeGame.id, { isActive: false });
};
