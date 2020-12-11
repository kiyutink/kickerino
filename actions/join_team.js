const firestore = require("../lib/firestore");
const joinTemplate = require("../lib/join_template");
const winnerTemplate = require("../lib/winner_template");

module.exports = async ({ body, ack, say, client }) => {
  await ack();
  const activeGameQuery = await firestore
    .collection("games")
    .where("isActive", "==", true)
    .get();
  if (activeGameQuery.empty) {
    say("There's no game in progress!");
    return;
  }

  const activeGameDocumentId = activeGameQuery.docs[0].id;
  const activeGame = activeGameQuery.docs[0].data();
  const action_id = body.actions[0].action_id;

  if (activeGame.team1.length >= 2 && activeGame.team2.length >= 2) {
    return;
  }

  let teamToJoin = "";

  switch (action_id) {
    case "join_team1":
      if (activeGame.team1.length < 2) {
        teamToJoin = "team1";
      }
      break;
    case "join_team2":
      if (activeGame.team2.length < 2) {
        teamToJoin = "team2";
      }
      break;
    case "join_team_random":
      if (activeGame.team1.length === 2) {
        teamToJoin = "team2";
        break;
      } else if (activeGame.team2.length === 2) {
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
    activeGame[teamToJoin].push(body.user.id);
  }

  await firestore.collection("games").doc(activeGameDocumentId).set(activeGame);
  await client.chat.update({
    channel: activeGame.slackChannelId,
    ts: activeGame.messageTs,
    blocks: joinTemplate(activeGame.team1, activeGame.team2),
  });

  if (activeGame.team1.length >= 2 && activeGame.team2.length >= 2) {
    await say({
      blocks: winnerTemplate(),
    });
  }
};
