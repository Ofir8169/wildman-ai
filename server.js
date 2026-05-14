require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Wildman AI עובד");
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message || "";

    const prompt = `
אתה יועץ גינות מקצועי של ווילדמן.

ענה בעברית בלבד.
ענה קצר, ברור, מקצועי ונעים.

אתה מבין בצמחייה, השקיה, תאורה, דקים, פרגולות, גינות יוקרה ועיצוב חוץ בישראל.

שאלה:
${userMessage}
`;

    const models = [
      "gemini-2.0-flash",
      "gemini-2.5-flash"
    ];

    let lastError = null;

    for (const model of models) {
      try {
        const response = await ai.models.generateContent({
          model: model,
          contents: prompt
        });

        return res.json({
          reply: response.text
        });

      } catch (error) {
        lastError = error;
        console.log("Model failed:", model, error.status || error.message);
      }
    }

    console.log(lastError);

    res.json({
      reply: "יש כרגע עומס זמני ב־AI. נסה שוב בעוד רגע 🌿"
    });

  } catch (error) {
    console.log(error);

    res.json({
      reply: "אירעה שגיאה זמנית. נסה שוב בעוד רגע 🌿"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});