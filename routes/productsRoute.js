const express = require('express');

const {
  getAll,
  getById,
} = require('../controllers/productsController');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/');
router.put('/:id');
router.delete('/:id');

module.exports = router;