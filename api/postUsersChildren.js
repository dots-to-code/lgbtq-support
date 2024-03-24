const axios = require('axios');

module.exports = async (req, res) => {
  const { content, email, childrenPayload } = req.body;

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
      return res.status(404).json({ error: 'User not found in Airtable' });
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

    return res.status(200).json(updateResponse.data);
  } catch (error) {
    return res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
};
