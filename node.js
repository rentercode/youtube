const admin = require("firebase-admin");
const express = require("express");
const app = express();

// Siz yuborgan JSON ma'lumotlarini shu yerga ulaymiz
const serviceAccount = {
  "project_id": "marketshop-4d990",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCrqF49C2u05u+K...", // To'liq kalitni qo'ying
  "client_email": "firebase-adminsdk-fbsvc@marketshop-4d990.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "marketshop-4d990.appspot.com"
});

const db = admin.firestore();

// Videolarni olish API
app.get("/api/videos", async (req, res) => {
    const snapshot = await db.collection("videos").get();
    let videos = [];
    snapshot.forEach(doc => videos.push({ id: doc.id, ...doc.data() }));
    res.json(videos);
});

// Layk bosish API
app.post("/api/like/:id", async (req, res) => {
    const videoRef = db.collection("videos").doc(req.params.id);
    await videoRef.update({
        likes: admin.firestore.FieldValue.increment(1)
    });
    res.send("Muvaffaqiyatli");
});

app.listen(3000, () => console.log("Server 3000-portda ishlamoqda"));