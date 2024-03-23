const { config } = require('dotenv');
config();
const axios = require('axios');

exports.handler = async (event) => {
  const { id } = event.queryStringParameters;
  const URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/consultations/${id}`;
  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
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
