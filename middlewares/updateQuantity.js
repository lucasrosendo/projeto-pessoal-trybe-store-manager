const productsService = require('../services/productsService');
const salesService = require('../services/salesService');

const createdSale = (req, res, next) => {
  try {
    const sale = req.body;
    sale.forEach(async ({ productId, quantity }) => {
      await productsService.subtract(productId, quantity);
    });

    next();
  } catch (err) {
    next(err);
  }
};

const deletedSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);
    sale.forEach(async ({ productId, quantity }) => {
      await productsService.add(productId, quantity);
    });

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createdSale,
  deletedSale,
};