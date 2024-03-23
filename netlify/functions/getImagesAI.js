const { config } = require('dotenv');
config();
const axios = require('axios');

exports.handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);
    console.log('Prompr netlify function', prompt);
    const apiKey = process.env.DALLE_API_KEY;
    const response = await axios.post(
      'https://api.openai.com/v1/davinci-images',
      {
        prompt: prompt,
        max_tokens: 150,
        temperature: 0.7,
        top_p: 1,
        n: 6, // Number of images to generate
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data.images),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error fetching images from DALL·E:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error fetching images from DALL·E' }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};
