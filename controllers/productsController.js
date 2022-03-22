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

const create = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const verifyName = await service.getAll();

    if (verifyName.find((p) => p.name === name)) {
      return res.status(409).json({ message: 'Product already exists' });
    }

    const newProduct = await service.create({ name, quantity });

    return res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const product = await service.getById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await service.update(+id, name, quantity);

    return res.status(200).json({ id, name, quantity });
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await service.getById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await service.deleteProduct(id);

    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};