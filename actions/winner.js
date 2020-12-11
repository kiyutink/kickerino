const firestore = require("../lib/firestore");

module.exports = async ({ say, body, ack }) => {
  await ack();
  const action_id = body.actions[0].action_id;

  const [, winner] = action_id.split("winner_");
  const activeGameQuery = await firestore
    .collection("games")
    .where("isActive", "==", true)
    .get();
  if (activeGameQuery.empty) {
    return;
  }

  const activeGameDocumentId = activeGameQuery.docs[0].id;

  firestore
    .collection("games")
    .doc(activeGameDocumentId)
    .set({ winner, isActive: false }, { merge: true });
};
