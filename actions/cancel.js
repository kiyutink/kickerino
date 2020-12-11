const api = require("../lib/api");
const gameOverTemplate = require("../lib/game_over_template");

module.exports = async ({ ack, client }) => {
  await ack();
  const activeGame = await api.getActiveGame();
  if (!activeGame) {
    return;
  }

  const activeGameData = activeGame.data();
  await client.chat.update({
    ts: activeGameData.winnerMessageTs,
    channel: activeGameData.slackChannelId,
    blocks: gameOverTemplate(activeGameData[activeGameData.winner], false),
  });
  await api.updateGame(activeGame.id, { isActive: false });
};
