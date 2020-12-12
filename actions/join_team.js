const api = require("../lib/api");
const joinTemplate = require("../lib/join_template");
const winnerTemplate = require("../lib/winner_template");

module.exports = async ({ body, ack, say, client }) => {
  await ack();
  const activeGame = await api.getActiveGame();
  if (!activeGame) {
    await say("There's no game in progress!");
    return;
  }
  const action_id = body.actions[0].action_id;
  const activeGameData = activeGame.data();

  if (activeGameData.team1.length >= 2 && activeGameData.team2.length >= 2) {
    return;
  }

  if (
    activeGameData.team1.includes(body.user.id) ||
    activeGameData.team2.includes(body.user.id)
  ) {
    return;
  }

  switch (action_id) {
    case "join_team1":
      if (activeGameData.team1.length < 2) {
        teamToJoin = "team1";
      }
      break;
    case "join_team2":
      if (activeGameData.team2.length < 2) {
        teamToJoin = "team2";
      }
      break;
    case "join_team_random":
      if (activeGameData.team1.length === 2) {
        teamToJoin = "team2";
        break;
      } else if (activeGameData.team2.length === 2) {
        teamToJoin = "team1";
        break;
      }

      if (Math.random() > 0.5) {
        teamToJoin = "team1";
      } else {
        teamToJoin = "team2";
      }
      break;
  }

  if (teamToJoin) {
    activeGameData[teamToJoin].push(body.user.id);
  }

  await api.updateGame(activeGame.id, activeGameData);

  await client.chat.update({
    channel: activeGameData.slackChannelId,
    ts: activeGameData.messageTs,
    blocks: joinTemplate(activeGameData.team1, activeGameData.team2),
  });

  if (activeGameData.team1.length >= 2 && activeGameData.team2.length >= 2) {
    const createdMessage = await say({
      blocks: winnerTemplate(),
    });

    await api.updateGame(activeGame.id, {
      winnerMessageTs: createdMessage.message.ts,
    });
  }
};
