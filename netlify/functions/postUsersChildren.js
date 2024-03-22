const { config } = require('dotenv');
config();
const axios = require('axios');

exports.handler = async (event) => {
  const { content, email, childrenPayload } = JSON.parse(event.body); // Extract email and children payload from the request body

  const baseURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/users`;

  try {
    // First, fetch the user record by email
    const fetchResponse = await axios.get(baseURL, {
      params: {
        filterByFormula: `({email} = '${email}')`, // Filter by email
        maxRecords: 1, // Limit to 1 record
      },
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    const userRecords = fetchResponse.data.records;
    let userId = null;

    // Check if user exists
    if (userRecords.length > 0) {
      userId = userRecords[0].id; // Get the user's record ID
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'User not found in Airtable' }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    // If user found, update the user record with children payload
    const updateResponse = await axios.patch(
      `${baseURL}/${userId}`,
      {
        fields: {
          children: JSON.stringify(childrenPayload),
          content: content,
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
      body: JSON.stringify(updateResponse.data),
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
