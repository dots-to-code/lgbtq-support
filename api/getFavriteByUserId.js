const axios = require('axios');

module.exports = async (req, res) => {
  const { userId } = req.query;
  const URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/favorites`;

  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
      },
      params: {
        filterByFormula: `{user_id}='${userId}'`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500;
    res.status(statusCode).json({ error: error.message });
  }
};
