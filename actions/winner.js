const api = require("../lib/api");
const gameOverTemplate = require("../lib/game_over_template");

module.exports = async ({ say, body, ack, client }) => {
  await ack();
  const action_id = body.actions[0].action_id;
  const [, winner] = action_id.split("winner_");
  const activeGame = await api.getActiveGame();
  if (!activeGame) {
    return;
  }
  const activeGameData = activeGame.data();

  await api.updateGame(activeGame.id, { winner });
  await client.chat.update({
    channel: activeGameData.slackChannelId,
    ts: activeGameData.winnerMessageTs,
    blocks: gameOverTemplate(activeGameData[winner]),
  });
};
