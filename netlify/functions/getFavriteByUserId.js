const { config } = require('dotenv');
config();
const axios = require('axios');

exports.handler = async (event) => {
  const { userId } = event.queryStringParameters;
  const URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/favorites`;

  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
      },
      params: {
        filterByFormula: `{user_id}='${userId}'`,
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
      body: JSON.stringify({ error: error.message }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};