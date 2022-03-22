const model = require('../models/salesModel');

const getAll = async () => model.getAll();

const getById = async (id) => model.getById(id);

const addSales = async (sales) => {
  const newSaleId = await model.newSales();

  sales.forEach(async (sale) => {
    await model.createSalesProducts(newSaleId.insertId, sale.productId, sale.quantity);
  });

  return ({ id: newSaleId.insertId, itemsSold: sales });
};

module.exports = {
  getAll,
  getById,
  addSales,
};