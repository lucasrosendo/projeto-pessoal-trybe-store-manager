const model = require('../models/salesModel');

const getAll = async () => model.getAll();

const getById = async (id) => model.getById(id);

module.exports = {
  getAll,
  getById,
};