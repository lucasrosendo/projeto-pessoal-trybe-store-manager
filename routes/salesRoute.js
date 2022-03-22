const express = require('express');

const {
  getAll,
  getById,
  addSales,
  update,
  deleteSale,
} = require('../controllers/salesController');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', addSales);
router.put('/:id', update);
router.delete('/:id', deleteSale);

module.exports = router;