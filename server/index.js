const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors");

app.use(cors());

// include .env file
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 8890;
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

const setCacheControl = require("./middlewares/setCacheControl")
const verifyToken = require("./middlewares/verifyToken")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use("/api/auth",        setCacheControl, require("./routes/auth"))
app.use("/api/user",        verifyToken, setCacheControl, require("./routes/user"))
app.use("/api/permission",  verifyToken, setCacheControl, require("./routes/permission"))
app.use("/api/role",        verifyToken, setCacheControl, require("./routes/role"))
app.use("/api/assurance",   verifyToken, setCacheControl, require("./routes/assurance"))
app.use("/api/treatment",   verifyToken, setCacheControl, require("./routes/treatment"))
app.use("/api/laboratory",  verifyToken, setCacheControl, require("./routes/laboratory"))
app.use("/api/consumableList", verifyToken, setCacheControl, require("./routes/consumableList"))
app.use("/api/patient",        verifyToken, setCacheControl, require("./routes/patient"))
app.use("/api/setting",        verifyToken, setCacheControl, require("./routes/setting"))
app.use("/api/paymentMethod",  verifyToken, setCacheControl, require("./routes/paymentMethod"))
app.use("/api/payment",        verifyToken, setCacheControl, require("./routes/payment"))
app.use("/api/devis",          verifyToken, setCacheControl, require("./routes/devis"))
app.use("/api/fiche",          verifyToken, setCacheControl, require("./routes/fiche"))
app.use("/api/invoice",        verifyToken, setCacheControl, require("./routes/invoice"))
app.use("/api/purchaseOrder",  verifyToken, setCacheControl, require("./routes/purchaseOrder"))
app.use("/api/consumption",    verifyToken, setCacheControl, require("./routes/consumption"))
app.use("/api/appointment",    verifyToken, setCacheControl, require("./routes/appointment"))
app.use("/api/supplier",       verifyToken, setCacheControl, require("./routes/supplier"))

app.listen(port, () => {
  console.log(`dentist software is running on port: ${port}`)
})



// const cors = require("cors");

// origin: "http://154.56.57.194:8890/",

// const corsOptions = {
// origin: "https://cdghazaly.com/",
//   optionsSuccessStatus: 200,
//   credentials: true
// };

// app.use(cors(corsOptions));

// const cors = require("cors");
// app.use(cors());
