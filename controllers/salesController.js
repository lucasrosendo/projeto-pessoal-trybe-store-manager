const service = require('../services/salesService');

const getAll = async (_req, res, next) => {
  try {
    const sales = await service.getAll();
    res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await service.getById(id);
    if (!sale.length) {
      return res.status(404)
        .json({ message: 'Sale not found' });
      }
    return res.status(200).json(sale);
  } catch (err) {
    next(err);
  }
};

const addSales = async (req, res, next) => {
  try {
    const [...sales] = req.body;
    const createdSales = await service.addSales(sales);

    return res.status(201).json(createdSales);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [{ productId, quantity }] = req.body;
    const result = await service.update(id, productId, quantity);

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;

    const sale = await service.getById(id);

    if (!sale.length) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    await service.deleteSale(id);

    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  addSales,
  update,
  deleteSale,
};