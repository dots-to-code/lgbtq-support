module.exports = async (req, res) => {
  const subject = req.query.name || 'World';
  return res.status(200).send(`Hello ${subject}!`);
};
