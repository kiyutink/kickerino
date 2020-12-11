const m = {
  ok: true,
  channel: "C01GUN9K90C",
  ts: "1607693867.003500",
  message: {
    bot_id: "B01GFS0GRDL",
    type: "message",
    text: "hello",
    user: "U01HCDFJF40",
    ts: "1607693867.003500",
    team: "T01GNHCHPU2",
    bot_profile: {
      id: "B01GFS0GRDL",
      deleted: false,
      name: "Kickerino",
      updated: 1607641674,
      app_id: "A01HCCX7Q80",
      icons: [Object],
      team_id: "T01GNHCHPU2",
    },
  },
  response_metadata: {
    scopes: ["chat:write", "channels:history", "groups:history", "commands"],
    acceptedScopes: ["chat:write"],
  },
};

module.exports = async ({ say, body, client }) => {
  console.log(client.chat.update({
    ts: m.message.ts,
    channel: m.channel,
    text: "Meow"
  }))

  const res = await say("hello");
};
