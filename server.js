// Imports
const express = require('express');
const path = require("path")
const cors = require('cors');
const mongoose = require('mongoose');

// Global variables
const app = express();
const port = process.env.PORT || 5000;

// CORS
app.use(cors());

require('dotenv').config();

//backend greeting page
app.get("/", (req, res) => {
  res.send("backend server is running");
});


app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || process.env.ATLAS_URI, {
   useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
   

const productsRouter = require('./routes/products');
app.use('/products', productsRouter); 



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 