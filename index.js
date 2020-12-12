require("dotenv").config();
const app = require("./app");
const play = require("./commands/play");
const leaderboard = require("./commands/leaderboard");
const joinTeam = require("./actions/join_team");
const winner = require("./actions/winner");
const cancel = require("./actions/cancel");
const rematch = require("./actions/rematch.");

app.command("/play", play);
app.command("/leaderboard", leaderboard);
app.action(/winner_.+/, winner);
app.action(/join_team.+/, joinTeam);
app.action("cancel", cancel);
app.action("rematch", rematch);

app.start(process.env.PORT || 3000);
