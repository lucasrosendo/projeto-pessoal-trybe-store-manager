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

const update = async (id, name, quantity) => model.update(id, name, quantity);

const deleteProduct = async (id) => model.deleteProduct(id);

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};