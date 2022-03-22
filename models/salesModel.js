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

const newSales = async () => {
  const [sales] = await connection.execute(
    `INSERT INTO
      StoreManager.sales ()
    VALUES ();`,
  );
  return sales;
};

const createSalesProducts = async (id, productId, quantity) => {
  const [sales] = await connection.execute(
    `
    INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)
    `,
    [id, productId, quantity],
  );
  return sales;
};

const update = async (saleId, productId, quantity) => {
  await connection.execute(
    `
    UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id = ? AND product_id = ?;
    `,
    [quantity, saleId, productId],
  );

  return {
    productId,
    quantity,
  };
};

const deleteSale = async (id) => {
  await connection.execute(
    `
  DELETE FROM StoreManager.sales
  WHERE id = ?
  `,
  [id],
  );
};

const subtractProduct = async (id, quantity) => {
  await connection.execute(
    `
      UPDATE StoreManager.products
      SET quantity = quantity - ?
      WHERE id = ?;    
    `,
    [quantity, id],
  );
};

const addProduct = async (id, quantity) => {
  await connection.execute(
    `
      UPDATE StoreManager.products
      SET quantity = quantity + ?
      WHERE id = ?
    `,
    [quantity, id],
  );
};

module.exports = {
  getAll,
  getById,
  newSales,
  createSalesProducts,
  update,
  deleteSale,
  subtractProduct,
  addProduct,
};