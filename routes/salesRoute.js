const express = require('express');

const {
  getAll,
  getById,
  addSales,
  update,
} = require('../controllers/salesController');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', addSales);
router.put('/:id', update);
router.delete('/:id');

module.exports = router;