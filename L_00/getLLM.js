require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getResponse(prompt) {
  const completion = await openai.createCompletion({
    model: 'gpt-4',
    prompt,
    max_tokens: 150,
  });
  console.log(completion.data.choices[0].text.trim());
}

getResponse('Hello, how can I assist you today?');
