import dotenv from 'dotenv';
import OpenAI from 'openai';
import readline from 'readline';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getResponse(prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt }
    ]
  });
  const generatedResponse = response.choices[0].message.content
  // Send the response back to the client
  console.log(generatedResponse);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter your prompt: ', (prompt) => {
  getResponse(prompt).then(() => rl.close());
});