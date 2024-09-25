import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import fs from 'fs';

dotenv.config();


// Determine __dirname since it's not available in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Serve static files like HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

async function getResponse(prompt) {
  try {
    // Call GPT-3.5
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt }
      ]
    });

    const generatedResponse = response.choices[0].message.content
    // Send the response back to the client
    return { response: generatedResponse };
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}

// API route to handle chat requests
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await getResponse(prompt);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

