const base64 = (str) => Buffer.from(str).toString("base64");
const fromBase64 = (str) => Buffer.from(str, "base64").toString();

const generateGame = ({
  slackTeamId,
  slackChannelId,
  messageTs,
  winnerMessageTs = null,
  team1 = [],
  team2 = [],
}) => ({
  team1,
  team2,
  winner: null,
  isActive: true,
  winnerMessageTs,
  slackTeamId,
  slackChannelId,
  messageTs,
});

module.exports = {
  base64,
  fromBase64,
  generateGame,
};
