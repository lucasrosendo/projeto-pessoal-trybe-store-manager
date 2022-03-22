const express = require('express');

const {
  getAll,
  getById,
  addSales,
  update,
  deleteSale,
} = require('../controllers/salesController');

const { 
  idValidation, 
  quantityValidation,
 } = require('../middlewares/validationSales');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', idValidation, quantityValidation, addSales);
router.put('/:id', idValidation, quantityValidation, update);
router.delete('/:id', deleteSale);

module.exports = router;