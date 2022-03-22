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

const update = async (saleId, productId, quantity) => {
  const sale = await model.update(saleId, productId, quantity);
  return ({ saleId, itemUpdated: [sale] });
};

const deleteSale = async (id) => model.deleteSale(id);

module.exports = {
  getAll,
  getById,
  addSales,
  update,
  deleteSale,
};