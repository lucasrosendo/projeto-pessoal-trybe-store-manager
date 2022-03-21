const error = (err, res, _req, _next) => {
  res.status(400).json({ message: 'Algo deu errado!' });
};

module.exports = error;