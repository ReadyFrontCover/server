const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 */ 

const conn = process.env.DB_STRING;
const dbOptions = { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connection = mongoose.createConnection(conn, dbOptions);

// Creates simple schema for a User.  The hash and salt are derived from the user's given password when they register
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean,
    type: String
});




const User = connection.model('User', UserSchema);

// Expose the connection
module.exports = connection;
