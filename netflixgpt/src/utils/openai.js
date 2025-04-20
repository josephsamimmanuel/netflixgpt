import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: import.meta.env['VITE_GPT_SECRET_KEY'], // Make sure this is set in your .env file
  dangerouslyAllowBrowser: true
});

const response = await openai.chat.completions.create({
  model: import.meta.env['VITE_GPT_MODEL'], 
  messages: [
    { role: "user", content: "Tell me a joke" }
  ],
});

console.log(response.choices[0].message.content);
