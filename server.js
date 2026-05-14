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

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const prompt = `
אתה מומחה ישראלי לגינות יוקרה, צמחים, השקיה, תאורה, דקים, פרגולות ועיצוב חוץ.

ענה בעברית בלבד.
ענה קצר, ברור, מקצועי ונעים.

אם שואלים על צמחים, תן:
- שמש או צל
- רמת השקיה
- תחזוקה
- התאמה לגינה יוקרתית

שאלה:
${userMessage}
`;
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest"
});
    
    res.json({
      reply: response.text
    });

  } catch (error) {
    console.error(error);

    res.json({
      reply: "אירעה שגיאה בחיבור ל־AI. בדוק שה־API KEY תקין ושהשרת רץ."
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});