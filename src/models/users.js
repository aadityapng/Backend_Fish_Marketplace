const dbPool = require("../config/database.js");

const getAllProducts = () => {
  const SQLQuery = 'SELECT * FROM allproduct';
  return dbPool.query(SQLQuery); // Menggunakan metode .query() untuk menjalankan kueri
};

const createNewProduct = (body) => {
  const SQLQuery = 'INSERT INTO allproduct (name, description, price, stock, image) VALUES ($1, $2, $3, $4, $5)';
  const values = [body.name, body.description, body.price, body.stock, body.image];
  return dbPool.query(SQLQuery, values); // Menggunakan parameterized query dan .query()
};

const updateProduct = (body, productId) => {
  const SQLQuery = 'UPDATE allproduct SET name=$1, description=$2, price=$3, stock=$4, image=$5 WHERE id=$6';
  const values = [body.name, body.description, body.price, body.stock, body.image, productId];
  return dbPool.query(SQLQuery, values); // Menggunakan parameterized query dan .query()
};

const deleteProduct = (productId) => {
  const SQLQuery = 'DELETE FROM allproduct WHERE id=$1';
  const values = [productId];
  return dbPool.query(SQLQuery, values); // Menggunakan parameterized query dan .query()
};

module.exports = { getAllProducts, createNewProduct, updateProduct, deleteProduct };
