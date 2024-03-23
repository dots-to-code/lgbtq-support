const { config } = require('dotenv');
config();
const axios = require('axios');

exports.handler = async (event) => {
  const payload = JSON.parse(event.body);
  const baseURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/consultation_response`;

  try {
    const response = await axios.post(baseURL, payload, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
        'Content-Type': 'application/json',
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
