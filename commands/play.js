const api = require("../lib/api");
const firestore = require("../lib/firestore");
const joinTemplate = require("../lib/join_template");

module.exports = async ({ say, ack, body, client }) => {
  await ack();
  const createdMessage = await say({
    blocks: joinTemplate(),
  });

  const newGame = {
    team1: [],
    team2: [],
    winner: null,
    isActive: true,
    slackTeamId: body.team_id,
    slackChannelId: body.channel_id,
    messageTs: createdMessage.message.ts,
  };

  if (Math.random() > 0.5) {
    newGame.team1.push(body.user_id);
  } else {
    newGame.team2.push(body.user_id);
  }

  await client.chat.update({
    channel: newGame.slackChannelId,
    ts: newGame.messageTs,
    blocks: joinTemplate(newGame.team1, newGame.team2),
  });

  api.createNewGame(newGame);
};
