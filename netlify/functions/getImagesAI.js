const { config } = require('dotenv');
config();
const axios = require('axios');

exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);
    const apiKey = process.env.DALLE_API_KEY;
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        model: 'dall-e-3',
        prompt: prompt,
        n: 1, // Number of images to generate
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error generating image:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error generating image:' }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};
