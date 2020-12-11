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

    return query.docs[0].ref;
  },

  createNewGame: async (game) => {
    return await firestore.collection("games").doc().create(game);
  },
};

module.exports = api;
