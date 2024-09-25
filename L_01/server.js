require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const path = require('path');
const app = express();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Serve static files like HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

async function getResponse(prompt) {
  const completion = await openai.createCompletion({
    model: 'gpt-4',
    prompt,
    max_tokens: 150,
  });
  return completion.data.choices[0].text.trim();
}

// API route to handle chat requests
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await getResponse(prompt);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

