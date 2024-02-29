const mongoose = require('mongoose');
const { execSync } = require('child_process');
const PaymentModel = require('./models/PaymentModel');

const dbName = "dentist"
// MongoDB connection string
// const mongoURI = `mongodb+srv://sniper:1212@cluster0.p4xc21i.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const mongoURI = `mongodb://127.0.0.1/${dbName}`;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Wait for the Mongoose connection to be established
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');


  async function updatePaymentDates() {
    try {
      const result = await PaymentModel.updateMany(
        {}, // This filter matches all documents. Adjust if needed.
        [{
          $set: {
            paymentDate: "$createdAt" // Set paymentDate to the value of createdAt
          }
        }]
      );
  
      console.log("Update result:", result);
    } catch (error) {
      console.error('Error updating payment dates:', error.message);
    }
  }

  updatePaymentDates();

});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err.message);
});
