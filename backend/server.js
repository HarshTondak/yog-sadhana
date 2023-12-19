const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();
const mongoose = require("mongoose");
const { readdirSync } = require("fs");
const { dotenv } = require("dotenv").config();

app.use(express.json());

// Using this because we are working on the local host itself
app.use(cors());

// To upload images
app.use(
  fileUpload({
    // Store files in a temporary storage(tmp folder)
    useTempFiles: true,
  })
);

// ------------------------------- ROUTES ------------------------------------
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// ------------------------------ DATABASE -----------------------------------
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("Error found", err));

const PORT = Number(process.env.PORT) || 8000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
