// Imports
const express = require('express');
const path = require("path");
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const passport = require("passport");
var timeout = require('connect-timeout')

const productsRouter = require('./routes/products');
const users = require("./routes/api/users");

// Global variables
const app = express();
const port = process.env.PORT || 5000;

// CORS
app.use(cors());
app.use(timeout('5s'))

require('dotenv').config();

//backend greeting page
app.get("/", (req, res) => {
  res.send("backend server is running");
});
app.use(timeout('5s'))

app.use(express.json());
app.use(timeout('5s'))

mongoose.connect(process.env.MONGODB_URI || process.env.ATLAS_URI, {
   useNewUrlParser: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
app.use(timeout('5s'))

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);
   


// Routes
app.use("/users", users);
app.use('/products', productsRouter); 


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});  
app.use(timeout('5s'))