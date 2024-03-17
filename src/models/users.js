const dbPool = require("../config/database.js");

const getAllProducts = (limit = null) => {
  let SQLQuery = 'SELECT * FROM allproduct ORDER BY created_at DESC';
  if (limit) {
    SQLQuery += ` LIMIT ${limit}`;
  }
  return dbPool.query(SQLQuery); // Menggunakan metode .query() untuk menjalankan kueri
};

const createNewProduct = (body) => {
  const SQLQuery = 'INSERT INTO allproduct (name, description, price, stock, image) VALUES ($1, $2, $3, $4, $5)';
  const values = [body.name, body.description, body.price, body.stock, body.image];
  return dbPool.query(SQLQuery, values); // Menggunakan parameterized query dan .query()
};

const updateProduct = (body, productId) => {
  const currentDate = new Date().toISOString(); // Mendapatkan waktu saat ini dalam format ISO
  const SQLQuery = `UPDATE allproduct 
                    SET name=$1, description=$2, price=$3, stock=$4, image=$5, updated_at=$6
                    WHERE id=$7`;
  const values = [body.name, body.description, body.price, body.stock, body.image, currentDate, productId];
  return dbPool.query(SQLQuery, values); // Menggunakan parameterized query dan .query()
};


const deleteProduct = (productId) => {
  const SQLQuery = 'DELETE FROM allproduct WHERE id=$1';
  const values = [productId];
  return dbPool.query(SQLQuery, values); // Menggunakan parameterized query dan .query()
};

module.exports = { getAllProducts, createNewProduct, updateProduct, deleteProduct };
