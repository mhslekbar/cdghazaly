const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));

// include .env file
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
const expressMongoSanitize = require("express-mongo-sanitize");

// start database connection
const mongoose = require("mongoose");
  mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Dentist DB Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });
// end database connection

// Middleware to sanitize input and output to and from MongoDB
app.use(expressMongoSanitize());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use("/api/auth", require("./routes/auth"))
app.use("/api/user", require("./routes/user"))
app.use("/api/permission", require("./routes/permission"))
app.use("/api/role", require("./routes/role"))
app.use("/api/assurance", require("./routes/assurance"))
app.use("/api/treatment", require("./routes/treatment"))
app.use("/api/laboratory", require("./routes/laboratory"))
app.use("/api/consumableList", require("./routes/consumableList"))
app.use("/api/patient", require("./routes/patient"))
app.use("/api/setting", require("./routes/setting"))
app.use("/api/paymentMethod", require("./routes/paymentMethod"))
app.use("/api/payment", require("./routes/payment"))
app.use("/api/devis", require("./routes/devis"))
app.use("/api/fiche", require("./routes/fiche"))

app.listen(port, () => {
  console.log(`dentist software is running on port: ${port}`)
})