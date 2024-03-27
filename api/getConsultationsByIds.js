const axios = require('axios');

module.exports = async (req, res) => {
  const { filterByFormula } = req.query;
  const URL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/consultations`;

  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
      },
      params: {
        filterByFormula: decodeURIComponent(filterByFormula),
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500;
    res.status(statusCode).json({ error: error.message });
  }
};
