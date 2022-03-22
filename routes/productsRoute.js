const express = require('express');

const {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
} = require('../controllers/productsController');

const router = express.Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteProduct);

module.exports = router;