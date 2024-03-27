const axios = require('axios');

module.exports = async (req, res) => {
  const { consultationId, userId } = req.body;

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

    res.status(200).json(createResponse.data);
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500;
    res.status(statusCode).json({ error: error.message });
  }
};
