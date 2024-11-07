const express = require("express");
const multer = require("multer");
const path = require("path");

const { uploadProjectImage } = require("../controllers/projectImage");

const router = express.Router();

const storage = multer.diskStorage({
	destination: (_, file, cb) => {
		cb(null, "uploads/projectImages");
	},
	filename: (_, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
		cb(null, uniqueSuffix + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

router.post("/upload", upload.single("projectImage"), uploadProjectImage);

module.exports = router;
