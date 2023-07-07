// Export all collections from MongoDB

// Define the database name
var databaseName = "dentist";

// Define the output folder
var outputFolder = "./db";

// Connect to the MongoDB shell
var conn = new Mongo();

// Get the database
var db = conn.getDB(databaseName);

// Get all collection names in the database
var collections = db.getCollectionNames();

// Iterate over each collection
collections.forEach(function(collection) {
  // Set the export file path
  var exportFilePath = outputFolder + collection + ".json";

  // Export the collection to JSON file
  var exportCommand = "mongoexport --db " + databaseName +
                      " --collection " + collection +
                      " --out " + exportFilePath +
                      " --jsonArray";

  // Execute the export command
  print("Exporting collection: " + collection);
  var result = shellExec(exportCommand);
  print(result);
});

print("Export completed.");

// mongoexport --db dentist --collection settings --out ./db/settings.json --jsonArray