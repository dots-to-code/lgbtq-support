const { config } = require('dotenv');
config();
const axios = require('axios');

exports.handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const { email } = payload.records[0].fields;

    // URL for checking if user exists
    const checkURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/users?filterByFormula={email}='${email}'`;

    // Check if user with the provided email already exists
    const checkResponse = await axios.get(checkURL, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    // If user already exists, return silently with 200 status code
    if (checkResponse.data.records.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ records: [] }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    // URL for posting data to Airtable to register new user
    const postURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/users`;

    // Make a POST request to register new user
    const response = await axios.post(postURL, payload, {
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
