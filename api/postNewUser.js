const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const payload = req.body;
    const { email } = payload.records[0].fields;

    // URL for checking if user exists
    const encodedEmail = encodeURIComponent(email);
    const checkURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/users?filterByFormula={email}='${encodedEmail}'`;

    // Check if user with the provided email already exists
    const checkResponse = await axios.get(checkURL, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    // If user already exists, return silently with 200 status code
    if (checkResponse.data.records.length > 0) {
      return res.status(200).json({ records: [] });
    } else {
      // URL for posting data to Airtable to register new user
      const postURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/users`;

      // Make a POST request to register new user
      const response = await axios.post(postURL, payload, {
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
          'Content-Type': 'application/json',
        },
      });

      return res.status(200).json(response.data);
    }
  } catch (error) {
    return res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
};
