const axios = require('axios');

module.exports = async (req, res) => {
  const { id } = JSON.parse(req.body);
  const baseURL = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/favorites/${id}`;

  try {
    const deleteResponse = await axios.delete(baseURL, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json(deleteResponse.data);
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500;
    res.status(statusCode).json({ error: error.message });
  }
};
