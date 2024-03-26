const { config } = require('dotenv');
config();
const axios = require('axios');

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);
  const baseURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/favorites/${id}`;

  try {
    const deleteResponse = await axios.delete(baseURL, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(deleteResponse.data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};