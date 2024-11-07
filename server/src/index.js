/* imports */

const express = require("express");
const cors = require("cors");
const path = require("path");

/* dotenv configure */

require("dotenv").config();

/* express app configure */

const app = express();

app.use(express.json());
app.use(cors());

/* api configure */

app.use("/api/projects", require("./routes/projects"));
app.use("/api/projectImage", require("./routes/projectImage"));

app.use("/uploads/projectImages", express.static(path.join(__dirname, "../uploads/projectImages")));

/* server configure */

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log("Server running on port:", PORT);
});
