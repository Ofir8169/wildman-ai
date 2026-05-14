require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Wildman AI עובד");
});

app.post("/chat", async (req, res) => {
  try {

    const userMessage = req.body.message;

    const response =
    await ai.models.generateContent({

      model: "gemini-2.5-flash",

      contents: `
      אתה יועץ גינות מקצועי.

      תענה בעברית בלבד.
      תהיה קצר, ברור ונעים.

      שאלה:
      ${userMessage}
      `

    });

    res.json({
      reply: response.text
    });

  }

  catch (error) {

    console.log(error);

    res.json({
      reply:
      "יש כרגע עומס זמני בשרת 🌿"
    });

  }
});

const PORT =
process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    "Server running on port " + PORT
  );

});