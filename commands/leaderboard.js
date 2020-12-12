const api = require("../lib/api");

module.exports = async ({ ack, say }) => {
  await ack();
  const collection = await api.getLeaderboard();
  await say(
    collection.docs
      .map((d) => {
        const data = d.data();
        const wr = data.wins / (data.wins + data.losses);
        return `<@${d.id}> - ${data.wins} wins - ${data.losses} losses - ${(
          wr * 100
        ).toFixed(2)}% WR`;
      })
      .join("\n")
  );
};
