const UsersModel = require("../models/users.js");

// pemangginalan data dari data base bersifat async braarti kita await
const getAllUsers = async (req, res) => {
  try {
    // sintaks destrukturisasi array [..]
    const [data] = await UsersModel.getAllUsers();
    res.json({
      message: "GET all users succsess",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      sereverMessage: error,
    });
  }
};

const createNewUsers = async (req, res) => {
  const newBody = req.body;

  if (!newBody.email || !newBody.name || !newBody.address) {
    return res.status(400).json({
      message: "Anda mengirimkan data yang salah!",
      data: null,
    });
  }

  try {
    await UsersModel.creatNewUser(newBody);
    res.status(201).json({
      message: "CREATE new users succsess",
      data: newBody,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      sereverMessage: error,
    });
  }
};

const updateUser = async (req, res) => {
  const idUser = req.params.idUser;
  const newBody = req.body;
  try {
    await UsersModel.updateUser(newBody, idUser);
    res.json({
      message: "UPDATE user succsess",
      data: {
        id: idUser,
        ...newBody,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      sereverMessage: error,
    });
  }
};

const deleteUser = async (req, res) => {
  const idUser = req.params.idUser;
  try {
    await UsersModel.deleteUser(idUser);
    res.json({
      message: "DELETE user succsess",
      data: null, // delete tidak mengurimkan data apapun jadi null
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      sereverMessage: error,
    });
  }
};

module.exports = { getAllUsers, createNewUsers, updateUser, deleteUser };
