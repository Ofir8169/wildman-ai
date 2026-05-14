require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());

app.use(express.json({
  limit:"20mb"
}));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req,res)=>{

  res.send(
    "Wildman AI עובד"
  );

});

app.post("/chat", async (req,res)=>{

  try{

    const {
      message,
      image
    } = req.body;

    const prompt = `
    אתה מומחה מקצועי לצמחייה,
    גינות יוקרה,
    השקיה,
    תאורה,
    דקים,
    פרגולות ועיצוב חוץ.

    ענה בעברית בלבד.
    תהיה קצר,
    ברור,
    מקצועי ונעים.

    אם יש תמונה:
    נתח אותה מקצועית.

    שאלה:
    ${message}
    `;

    let response;

    /* אם יש תמונה */

    if(image){

      response =
      await ai.models.generateContent({

        model:"gemini-2.0-flash",

        contents:[

          {
            text:prompt
          },

          {
            inlineData:{

              mimeType:"image/jpeg",

              data:image

            }
          }

        ]

      });

    }

    /* רק טקסט */

    else{

      response =
      await ai.models.generateContent({

        model:"gemini-2.0-flash",

        contents:prompt

      });

    }

    res.json({

      reply:
      response.text

    });

  }

  catch(error){

    console.log(error);

    res.json({

      reply:
      "יש עומס זמני ב־AI 🌿"

    });

  }

});

const PORT =
process.env.PORT || 3000;

app.listen(PORT,()=>{

  console.log(
    "Server running on port " + PORT
  );

});
