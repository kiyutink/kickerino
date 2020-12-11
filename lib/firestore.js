const firebaseAdmin = require("firebase-admin");
const { fromBase64 } = require("./helpers");
const serviceAccountKey = JSON.parse(
  fromBase64(process.env.FIREBASE_JSON_BASE64)
);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccountKey),
});

const firestore = firebaseAdmin.firestore();

module.exports = firestore;
