const multer = require("multer");

// ใช้ multer สร้างpath ของไฟล์ใน diskStorage ก่อนที่จะขึ้นไปอัพโหลดบน cloudinary

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../personal_project/api/public/images"); //เลือกlocation ของไฟล์ที่จะเก็บ  ต้องมีโฟลเดอร์นี้อยู่
  },
  filename: (req, file, cb) => {
    console.log(file);

    const filename = `${new Date().getTime()}${Math.round(
      Math.random() * 100000
    )}.${file.mimetype.split("/")[1]}`; // ทำชื่อไฟล์
    cb(null, filename);
  },
}); // เลือกใช้แบบ Storage  หากจะใช้memory ให้เลือก memorystorage

const upload = multer({ storage });

module.exports = upload;
