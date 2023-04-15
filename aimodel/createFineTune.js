import { openai } from "./api.js";

async function createFineTune() {
  try {
    const response = await openai.createFineTune({
      training_file: "file-TxN8pqIMf5Myw30qmcKxfrHZ",
      model: "davinci:ft-personal-2023-04-15-03-52-01",
    });
    console.log("response: ", response);
  } catch (err) {
    console.log("error: ", err.response.data.error);
  }
}

createFineTune();
