const connection = require('./connection');

const getAll = async () => {
  const [sales] = await connection.execute(`
    SELECT
      sales.id AS saleId,
      sales.date,
      product.product_id AS productId,
      product.quantity
    FROM
      StoreManager.sales
    INNER JOIN
      StoreManager.sales_products AS product
        ON sales.id = product.sale_id;
  `);

  return sales;
};

const getById = async (id) => {
  const [sales] = await connection.execute(`
    SELECT
      sales.date,
      product.product_id AS productId,
      product.quantity
    FROM
      StoreManager.sales
    INNER JOIN
      StoreManager.sales_products AS product
        ON sales.id = product.sale_id
    WHERE sales.id = ?;
  `, [id]);

  if (!id || !sales.length) return { code: 404 };
  return sales;
};

module.exports = {
  getAll,
  getById,
};