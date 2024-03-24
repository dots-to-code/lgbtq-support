const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const { prompt } = req.body;
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

    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error generating image:', error);
    return res.status(500).json({ error: 'Error generating image:' });
  }
};
