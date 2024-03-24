const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const baseURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/consultations`;

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

    return res.status(200).json(createResponse.data);
  } catch (error) {
    return res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
};
