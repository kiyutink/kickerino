module.exports = (team1 = [], team2 = []) => {
  const text =
    team1.length >= 2 && team2.length >= 2
      ? "Playing with the following teams:"
      : "Starting a game, join a team by clicking one of the buttons below";

  const currentTeams = `Team 1: ${team1
    .map((userId) => `<@${userId}>`)
    .join(", ")} \n Team 2: ${team2
    .map((userId) => `<@${userId}>`)
    .join(", ")}`;

  const buttons = [];
  if (team1.length < 2 && team2.length < 2) {
    buttons.push({
      type: "button",
      text: {
        type: "plain_text",
        text: "Join random team",
      },
      value: "join_team_random",
      action_id: "join_team_random",
    });
  }
  if (team1.length < 2) {
    buttons.push({
      type: "button",
      text: {
        type: "plain_text",
        text: "Join team 1",
      },
      value: "join_team1",
      action_id: "join_team1",
    });
  }

  if (team2.length < 2) {
    buttons.push({
      type: "button",
      text: {
        type: "plain_text",
        text: "Join team 2",
      },
      value: "join_team2",
      action_id: "join_team2",
    });
  }

  if (team1.length < 2 || team2.length < 2) {
    buttons.push({
      type: "button",
      style: "danger",
      text: {
        type: "plain_text",
        text: "Cancel",
      },
      value: "cancel",
      action_id: "cancel",
    });
  }

  const blocks = [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: currentTeams,
      },
    },
  ];

  if (buttons.length) {
    blocks.push({
      type: "actions",
      elements: buttons,
    });
  }

  return blocks;
};
