const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });

const DB_CONNECTION_URI = process.env.MONGO_URI || "";
const DB_NAME = process.env.MONGO_NAME || "";

const config = {
  mongodb: {
    url: DB_CONNECTION_URI,
    databaseName: DB_NAME,

    // options: {}
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "migrations",

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "changelog",

  // The file extension to create migrations and search for in migration dir 
  migrationFileExtension: ".js",

  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determine
  // if the file should be run.  Requires that scripts are coded to be run multiple times.
  useFileHash: false,

  // Don't change this, unless you know what you're doing
  moduleSystem: 'commonjs',
};

module.exports = config;
