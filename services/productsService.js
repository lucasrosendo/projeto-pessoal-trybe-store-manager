const model = require('../models/productsModel');

const getAll = async () => model.getAll();

const getById = async (id) => model.getById(id);

module.exports = {
  getAll,
  getById,
};