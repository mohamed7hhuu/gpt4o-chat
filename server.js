require('dotenv').config();
const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const app = express();

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "أنت مساعد ذكي يتحدث العربية." },
        { role: "user", content: userMessage }
      ]
    });
    const reply = completion.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ reply: "❌ حدث خطأ، حاول مرة أخرى لاحقًا." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));