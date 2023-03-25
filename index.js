// import { Configuration, OpenAIApi } from "openai";
const { Configuration, OpenAIApi } = require('openai')
require('dotenv').config()

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function createImage() {
  const response = await openai.createImage({
    prompt: "A cute baby sea otter",
    n: 1,
    size: "1024x1024",
  }).then(res => {
    return res.data.data[0].url;
  })

  console.log(response);
}

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
listModels()