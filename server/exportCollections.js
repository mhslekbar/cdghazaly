const mongoose = require('mongoose');
const { execSync } = require('child_process');

const dbName = "dentist"
// MongoDB connection string
const mongoURI = `mongodb+srv://sniper:1212@cluster0.p4xc21i.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Output directory for backups
const backupDir = `C:/Users/INFOTELEC/Desktop/mongodb_backup/${dbName}`; // file to store data
// const backupDir = "C:\\Users\\INFOTELEC\\Desktop\\mongodb_backup";

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Wait for the Mongoose connection to be established
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');

  // Get all collection names using Mongoose
  async function getAllCollections() {
    const collections = await mongoose.connection.db.listCollections().toArray();
    return collections.map(collection => collection.name);
  }

  // Export all collections
  async function exportCollections() {
    const collections = await getAllCollections();

    for (const collection of collections) {
      const command = `mongoexport --uri="${mongoURI}" --db=${mongoose.connection.name} --collection=${collection} --out=${backupDir}/${collection}.json --jsonArray`;
      try {
        execSync(command, { stdio: 'inherit' });
        console.log(`Exported ${collection} successfully`);
      } catch (error) {
        console.error(`Error exporting ${collection}: ${error.message}`);
      }
    }

    console.log('All collections exported successfully.');
  }

  // Run the exportCollections function
  exportCollections();
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err.message);
});
