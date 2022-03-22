const model = require('../models/salesModel');

const getAll = async () => model.getAll();

const getById = async (id) => model.getById(id);

const create = async (sales) => {
  const saleId = await model.newSaleId();
  sales.forEach(async (sale) => {
    await model.create(saleId.insertId, sale.productId, sale.quantity);
  });
  return ({ id: saleId.insertId, itemsSold: sales });
};

const update = async (saleId, productId, quantity) => {
  const sale = await model.update(saleId, productId, quantity);
  return ({ saleId, itemUpdated: [sale] });
};

const deleteSale = async (id) => model.deleteSale(id);

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteSale,
};