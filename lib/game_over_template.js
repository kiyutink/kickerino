module.exports = (winners = [], withButtons = true) => {
  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `Congrats, <@${winners[0]}> and <@${winners[1]}>`,
      },
    },
  ];
  if (withButtons) {
    blocks.push({
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Rematch (same teams)",
          },
          value: "rematch",
          action_id: "rematch",
        },
        {
          type: "button",
          style: "danger",
          text: {
            type: "plain_text",
            text: "Stop playing",
          },
          value: "cancel",
          action_id: "cancel",
        },
      ],
    });
  }
  return blocks
};
