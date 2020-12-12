const firestore = require("./firestore");

const api = {
  getActiveGame: async () => {
    const query = await firestore
      .collection("games")
      .where("isActive", "==", true)
      .get();

    if (query.empty) {
      return null;
    }

    return query.docs[0];
  },

  updateGame: async (id, game) => {
    return await firestore
      .collection("games")
      .doc(id)
      .set(game, { merge: true });
  },

  createNewGame: async (game) => {
    return await firestore.collection("games").doc().create(game);
  },

  getPlayer: async (id) => {
    return await firestore.collection("players").doc(String(id)).get();
  },

  updatePlayer: async (id, fields) => {
    return await firestore
      .collection("players")
      .doc(String(id))
      .set(fields, { merge: true });
  },

  getLeaderboard: async () => {
    return await firestore.collection("players").orderBy("wins", "desc").get();
  },
};

module.exports = api;
