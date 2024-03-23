const { config } = require('dotenv');
config();
const axios = require('axios');

exports.handler = async (event) => {
  const { userId, content } = JSON.parse(event.body);
  const baseURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/consultations`;

  try {

    const currentDate = new Date().toISOString();

    // Create a new consultation record
    const createResponse = await axios.post(
      baseURL,
      {
        fields: {
          user_id: userId,
          content: content,
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