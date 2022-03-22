const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    `
      SELECT id, name, quantity FROM StoreManager.products
      ORDER BY id;
    `,
  );
  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute(
    `
    SELECT id, name, quantity FROM StoreManager.products
    WHERE id = ?
    `,
    [id],
  );
  return product[0];
};

const create = async (name, quantity) => {
  const [result] = await connection.execute(
    `
    INSERT INTO StoreManager.products (name, quantity)
    VALUES (?, ?);
    `,
    [name, quantity],
  );

  return result;
};

module.exports = {
  getAll,
  getById,
  create,
};