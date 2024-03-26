const { config } = require('dotenv');
config();
const axios = require('axios');

exports.handler = async (event) => {
  const { consultationId, userId } = JSON.parse(event.body);

  const baseURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/favorites`;

  try {

    const currentDate = new Date().toISOString();

    // Create a new consultation record
    const createResponse = await axios.post(
      baseURL,
      {
        fields: {
          consultation_id: consultationId,
          user_id: userId,
          created_at: currentDate,
          updated_at: currentDate,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return {
      statusCode: 200,
      body: JSON.stringify(createResponse.data),
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