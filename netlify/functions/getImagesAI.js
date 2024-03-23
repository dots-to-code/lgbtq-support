const { config } = require('dotenv');
config();
const axios = require('axios');

const fetchImagesFromDALLE = async (styleTags) => {
  try {
    const apiKey = process.env.DALLE_API_KEY;
    const response = await axios.post(
      'https://api.openai.com/v1/davinci-images',
      {
        prompt: styleTags,
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

    return response.data.images;
  } catch (error) {
    console.error('Error fetching images from DALL·E:', error);
    throw error;
  }
};

// Example usage:
const styleTags = ['casual clothing', 'formal wear', 'sportswear'];
fetchImagesFromDALLE(styleTags)
  .then((images) => {
    console.log('Images:', images);
    // Handle the images in your frontend
  })
  .catch((error) => console.error('Error:', error));
