const express = require('express');
const app = express();
app.use(express.json());

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;
  const response = await getResponse(prompt);
  res.send(response);
});
async function getResponse(prompt) {
    const completion = await openai.createCompletion({
      model: 'gpt-4',
      prompt,
      max_tokens: 150,
    });
    console.log(completion.data.choices[0].text.trim());
  }
  
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
