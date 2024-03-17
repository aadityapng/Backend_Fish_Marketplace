const UsersModel = require("../models/users.js");

// pemangginalan data dari data base bersifat async braarti kita await
const getAllProducts = async (req, res) => {
  try {
    // sintaks destrukturisasi array [..]
    const limit = req.query.limit ? parseInt(req.query.limit) : null; // Menggunakan objek req.query untuk mengakses query string pada bagain server
    const data = await UsersModel.getAllProducts(limit);
    res.json({
      message: "GET all users succsess",
      data: data.rows,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      sereverMessage: error,
    });
  }
};

const createNewProduct = async (req, res) => {
  const { body } = req;

  // Periksa apakah data yang diperlukan tersedia
  if (
    !body.name ||
    !body.description ||
    !body.price ||
    !body.stock ||
    !body.image
  ) {
    return res.status(400).json({
      message: "Data yang dikirim tidak lengkap!",
      data: null,
    });
  }

  try {
    // Panggil model untuk membuat produk baru
    await UsersModel.createNewProduct(body);

    // Kirim respons jika berhasil
    res.status(201).json({
      message: "Produk baru berhasil dibuat",
      data: body,
    });
  } catch (error) {
    // Tangani kesalahan server
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      serverMessage: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  // Mengambil productId dari parameter permintaan (dari URL)
  const { productId } = req.params;

  // Mengambil data baru dari body permintaan
  const { body } = req;

  try {
    // Memanggil model untuk melakukan pembaruan produk
    await UsersModel.updateProduct(body, productId);

    // Mengirim respons jika pembaruan berhasil
    res.json({
      message: "Produk berhasil diperbarui",
      data: {
        id: productId,
        ...body,
      },
    });
  } catch (error) {
    // Menangani kesalahan server
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      serverMessage: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    await UsersModel.deleteProduct(productId);
    res.json({
      message: "Product deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
