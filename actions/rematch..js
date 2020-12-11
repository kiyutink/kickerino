const api = require("../lib/api");
const game_over_template = require("../lib/game_over_template");
const { generateGame } = require("../lib/helpers");
const joinTemplate = require("../lib/join_template");
const winnerTemplate = require("../lib/winner_template");

module.exports = async ({ ack, client, say }) => {
  await ack();

  const activeGame = await api.getActiveGame();
  if (!activeGame) {
    return;
  }

  const activeGameData = activeGame.data();
  const { message: teamsMessage } = await say({
    blocks: joinTemplate(activeGameData.team1, activeGameData.team2),
  });
  const { message: winnerMessage } = await say({ blocks: winnerTemplate() });

  await api.updateGame(activeGame.id, { isActive: false });
  await client.chat.update({
    ts: activeGameData.winnerMessageTs,
    channel: activeGameData.slackChannelId,
    blocks: game_over_template(activeGameData[activeGameData.winner], false),
  });
  const newGame = generateGame({
    slackChannelId: activeGameData.slackChannelId,
    slackTeamId: activeGameData.slackTeamId,
    winnerMessageTs: winnerMessage.ts,
    messageTs: teamsMessage.ts,
    team1: activeGameData.team1,
    team2: activeGameData.team2,
  });
  await api.createNewGame(newGame);
};
