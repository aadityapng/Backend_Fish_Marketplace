const express = require("express");
const app = express();
var cors = require("cors");
const path = require("path");

app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8000;

const usersRoutes = require("./routes/users.js");

const middlewareLogRequest = require("./middleware/logs.js");
const upload = require("./middleware/multer.js"); //dari middleware multer
const dbPool = require("./config/database.js");

// app.method(path, handler);

// Bentuk Umum
// app.use("/", (req, res, next) => {
//   res.send("Hello World");
// });

// Middleware
// Next bisa di hapus kalau tidak di gunakan, biasanya di gunakan untuk middleware

// middleware seblum di pindah
// app.use((req, res, next) => {
//   console.log("middleware ke 2");
//   next();
// });

// beberapa bentuk respon yang biasa di gunakan res.send string biasa, html dan res.json
// app.get("/", (req, res) => {
//   res.send("<h1>Hello Get Method</h1>");
// });

// app.post("/", (req, res) => {
//   res.json({
//     nama: "aditya",
//     alamat: "Lampung",
//   });
// });

app.use(middlewareLogRequest); // ini middleware menunjukan berjalan di path mana
app.use(express.json()); // Untuk mengizinkan membaca badan JSON
app.use("/assets", express.static("public/images")); //Middleware ini digunakan untuk menyajikan file statis, seperti gambar, stylesheet, atau script JavaScript, kepada klien

app.use("/users", usersRoutes);

// menggunakan middleware spesifik di sebuah path, contoh multer yang suda di import
app.post("/upload", upload.single("photo"), (req, res) => {
  res.json({
    message: "Upload berhasil",
  });
});


app.get("/:imageName", (req, res) => {
  const imageName = req.params.imageName;

  // Construct the file path based on the requested image name
  const imagePath = path.join(__dirname, "../public/images", imageName);

  // Check if the file exists
  if (require("fs").existsSync(imagePath)) {
    // If the file exists, send it as a response
    res.sendFile(imagePath);
  } else {
    // If the file doesn't exist, return a 404 error
    res.status(404).send("Image not found");
  }
});


// meddleware untuk menghandle error upload dll (error handling)
app.use((err, req, res, next) => {
  res.json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

// CARA CEK KONEKSI DATABASE!!!!!!!!!!!!!!!!!!!
dbPool.connect((err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Connected");
  }
});
