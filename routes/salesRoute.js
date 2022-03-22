const express = require('express');

const {
  getAll,
  getById,
  addSales,
} = require('../controllers/salesController');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', addSales);
router.put('/:id');
router.delete('/:id');

module.exports = router;