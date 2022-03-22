const idValidation = (req, res, next) => {
  try {
    const [{ productId }] = req.body;

    if (!productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const quantityValidation = (req, res, next) => {
  try {
    const [{ quantity }] = req.body;
    if (!quantity && typeof quantity !== 'number') {
      return res.status(400).json({ message: '"quantity" is required' });
    }

    if (quantity <= 0) {
      return res.status(422)
        .json({ message: '"quantity" must be greater than or equal to 1' });
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  idValidation,
  quantityValidation,
};