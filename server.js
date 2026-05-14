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
  res.send("Wildman AI server is running");
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message || "";

    const prompt = `
אתה יועץ גינות מקצועי של ווילדמן.

ענה בעברית בלבד.
ענה קצר, ברור, מקצועי ונעים.

אתה מבין ב:
צמחייה, השקיה, תאורה, פרגולות, דקים, גינות יוקרה ועיצוב חוץ בישראל.

שאלה:
${userMessage}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    res.json({
      reply: response.text
    });

  } catch (error) {
    console.error(error);

    res.json({
      reply: "יש עומס זמני או בעיית חיבור ל־AI. נסה שוב בעוד רגע."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});