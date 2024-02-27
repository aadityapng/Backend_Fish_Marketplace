// Import modul dbPool dari file ../config/database.js
const dbPool = require("../config/database.js");

// Mendefinisikan fungsi getAllUsers
const getAllUsers = () => {
  const SQLQuery = "SELECT * FROM users";
  return dbPool.execute(SQLQuery);
};

const creatNewUser = (body) => {
  const SQLQuery = `INSERT INTO users (name, email, address) 
                    VALUE ('${body.name}', '${body.email}', '${body.address}')`;
  return dbPool.execute(SQLQuery);
};

const updateUser = (body, idUser) => {
  const SQLQuery = `UPDATE users 
                    SET name='${body.name}', email='${body.email}', address='${body.address}' 
                    WHERE id=${idUser}`;
  return dbPool.execute(SQLQuery);
};

const deleteUser = (idUser) => {
  const SQLQuery = `DELETE FROM users 
                    WHERE id=${idUser}`;
  return dbPool.execute(SQLQuery);
};

// Mengekspor fungsi getAllUsers agar bisa digunakan di file lain
module.exports = { getAllUsers, creatNewUser, updateUser, deleteUser };
