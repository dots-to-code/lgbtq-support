const axios = require('axios');

module.exports = async (req, res) => {
  const { id } = req.query;
  const URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/users/${id}`;
  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
      },
    });

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(error.response ? error.response.status : 500).json({ error: error.message });
  }
};
