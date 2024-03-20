const { config } = require('dotenv');
config();
const axios = require('axios');

exports.handler = async (event) => {
  try {
    // Parse the incoming payload from the event body
    const payload = JSON.parse(event.body);

    // URL for posting data to Airtable
    const URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/users`;

    // Make a POST request to Airtable API with the payload
    const response = await axios.post(URL, payload, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
        'Content-Type': 'application/json', // Specify content type as JSON
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({
        error: error.message,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};
