const model = require('../models/productsModel');

const getAll = async () => model.getAll();

const getById = async (id) => model.getById(id);

const create = async ({ name, quantity }) => {
  const product = await model.create(name, quantity);
  return {
    id: product.insertId,
    name,
    quantity,
  };
};

module.exports = {
  getAll,
  getById,
  create,
};