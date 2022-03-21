const service = require('../services/productsService');

const getAll = async (req, res, next) => {
  try {
    const products = await service.getAll();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getById(id);
    if (!product) {
      return res.status(404)
        .json({ message: 'Product not found' });
      }
    return res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
};