const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const payload = req.body;
    const baseURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/consultation_response`;

    const response = await axios.post(baseURL, payload, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
};
