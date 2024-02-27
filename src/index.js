const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

const usersRoutes = require("./routes/users.js");

const middlewareLogRequest = require("./middleware/logs.js");
const upload = require("./middleware/multer.js"); //dari middleware multer

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

// meddleware untuk menghandle error upload dll (error handling)
app.use((err, req, res, next) => {
  res.json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
