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

const update = async (id, name, quantity) => {
  await connection.execute(
    `UPDATE
      StoreManager.products
    SET
      name = ?,
      quantity = ?
    WHERE
      id = ?;`,
    [name, quantity, id],
  );
};

const deleteProduct = async (id) => {
  await connection.execute(
    `
    DELETE FROM StoreManager.products WHERE id = ?
    `,
    [id],
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteProduct,
};