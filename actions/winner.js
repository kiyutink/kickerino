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
  if (activeGameData.winner !== null) {
    return;
  }

  await api.updateGame(activeGame.id, { winner });
  const loser = winner === "team1" ? "team2" : "team1";
  for (const playerId of activeGameData[winner]) {
    const player = await api.getPlayer(playerId);
    if (player.exists) {
      await api.updatePlayer(playerId, { wins: player.data().wins + 1 });
    } else {
      await api.updatePlayer(playerId, { wins: 1, losses: 0 });
    }
  }

  for (const playerId of activeGameData[loser]) {
    const player = await api.getPlayer(playerId);
    if (player.exists) {
      await api.updatePlayer(playerId, { losses: player.data().losses + 1 });
    } else {
      await api.updatePlayer(playerId, { losses: 1, wins: 0 });
    }
  }
  await client.chat.update({
    channel: activeGameData.slackChannelId,
    ts: activeGameData.winnerMessageTs,
    blocks: gameOverTemplate(activeGameData[winner]),
  });
};
