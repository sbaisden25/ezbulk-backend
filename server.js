// Imports
const express = require('express');
const path = require("path");
const cors = require('cors');
const mongoose = require('mongoose');
var timeout = require('connect-timeout')

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
   

const productsRouter = require('./routes/api/products');
app.use('/products', productsRouter); 
const stacksRouter = require('./routes/api/stacks');
app.use('/stacks', stacksRouter); 
app.use(timeout('5s'))
const postsRouter = require('./routes/api/posts');
app.use('/research', postsRouter);
app.use(timeout('5s'))

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});  
app.use(timeout('5s'))