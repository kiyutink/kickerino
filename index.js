require("dotenv").config();
const app = require("./app");
const play = require("./commands/play");
const joinTeam = require("./actions/join_team");
const test = require("./commands/test");
const winner = require("./actions/winner");
const cancel = require("./actions/cancel");

app.command("/play", play);
app.action(/winner_.+/, winner);
app.action(/join_team.+/, joinTeam);
app.action("cancel", cancel);
app.message("hi", test);

app.start(process.env.PORT || 3000);
