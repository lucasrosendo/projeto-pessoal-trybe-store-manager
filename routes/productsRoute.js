const express = require('express');

const {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
} = require('../controllers/productsController');

const { nameValidation, quantityValidation } = require('../middlewares/validationProducts');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post(
  '/',
  nameValidation,
  quantityValidation,
  create,
);
router.put(
  '/:id',
  nameValidation,
  quantityValidation,
  update,
);
router.delete('/:id', deleteProduct);

module.exports = router;