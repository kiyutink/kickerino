module.exports = () => [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: "Select the winner when you're done:",
    },
  },
  {
    type: "actions",
    elements: [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Team 1 won",
        },
        value: "winner_team1",
        action_id: "winner_team1",
      },
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Team 2 won",
        },
        value: "winner_team2",
        action_id: "winner_team2",
      },
    ],
  },
];
