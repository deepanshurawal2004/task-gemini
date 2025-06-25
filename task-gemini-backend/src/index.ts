import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDGPvEnLtWtkUFnNRedqkNjxmWp9xO8mzU"; // Replace with real key

app.post("/generate-tasks", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const requestData = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };
    app.get("/", (req, res) => {
  res.send("✅ Task-Gemini backend is running!");
});


    const response = await axios.post(
  GEMINI_API_URL,
  {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

    // Safe response parsing
    const data = response.data as {
      candidates?: {
        content?: {
          parts?: { text?: string }[];
        };
      }[];
    };

    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      console.error("❌ Invalid response structure:", response.data);
      return res.status(500).json({ error: "Invalid response from Gemini API" });
    }

    const lines = generatedText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    res.json({ tasks: lines });
  } catch (error: any) {
  console.error("❌ Error generating tasks:", error?.response?.data || error.message);
  res.status(500).json({ error: "Failed to generate tasks. Invalid response." });
}

});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
