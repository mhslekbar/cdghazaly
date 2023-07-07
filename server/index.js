const express = require("express")
const app = express()
const bodyParser = require("body-parser")

const cors = require("cors");

// const corsOptions = {
// origin: "https://cabinet-elghazaly.vercel.app/",
//   origin: "http://localhost:3032",
//   optionsSuccessStatus: 200,
//   credentials: true
// };

// app.use(cors(corsOptions));

app.use(cors());

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

const setCacheControl = require("./middlewares/setCacheControl")


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use("/api/auth", setCacheControl, require("./routes/auth"))
app.use("/api/user",  setCacheControl, require("./routes/user"))
app.use("/api/permission",  setCacheControl, require("./routes/permission"))
app.use("/api/role",  setCacheControl, require("./routes/role"))
app.use("/api/assurance",  setCacheControl, require("./routes/assurance"))
app.use("/api/treatment",  setCacheControl, require("./routes/treatment"))
app.use("/api/laboratory",  setCacheControl, require("./routes/laboratory"))
app.use("/api/consumableList",  setCacheControl, require("./routes/consumableList"))
app.use("/api/patient",  setCacheControl, require("./routes/patient"))
app.use("/api/setting",  setCacheControl, require("./routes/setting"))
app.use("/api/paymentMethod",  setCacheControl, require("./routes/paymentMethod"))
app.use("/api/payment",  setCacheControl, require("./routes/payment"))
app.use("/api/devis",  setCacheControl, require("./routes/devis"))
app.use("/api/fiche",  setCacheControl, require("./routes/fiche"))
app.use("/api/invoice",  setCacheControl, require("./routes/invoice"))
app.use("/api/boncommande",  setCacheControl, require("./routes/bonCommande"))
app.use("/api/consumption",  setCacheControl, require("./routes/consumption"))
app.use("/api/appointment",  setCacheControl, require("./routes/appointment"))


app.listen(port, () => {
  console.log(`dentist software is running on port: ${port}`)
})
