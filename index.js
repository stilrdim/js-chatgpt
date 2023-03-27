const { Configuration, OpenAIApi } = require('openai')
require('dotenv').config()

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Generate an image by using prompt, should take about 10seconds to return a url
// Can generate multiple images at once
async function createImage(prompt, num = 1) {
  const response = await openai.createImage({
    prompt: prompt,
    n: num,
    size: "1024x1024",
  }).then(res => {
    return res.data.data[0].url;
  })

  console.log(response);
}

// List all available AI models and basic info about them
async function listModels() {
  const response = await openai.listModels()
    .then(res => {
      return res.data.data.forEach(item => {
        console.log(`Name: ${item.id}\tOwner:${item.owned_by}\n${new Date(item.created * 1000).toDateString()}\n`)
      });
    })
    .catch(() => {
      return "failed"
    })

  console.log(response);
}