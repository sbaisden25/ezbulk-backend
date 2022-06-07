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
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.options('*', cors(corsOptions)); // preflight OPTIONS; put before other routes
app.listen(port, function(){
  console.log('CORS-enabled web server listening on port 80');
}); 

require('dotenv').config();

//backend greeting page
app.get("/", (req, res) => {
  res.send("backend server is running");
});


app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || process.env.ATLAS_URI, {
   useNewUrlParser: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error(err));
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
   

const productsRouter = require('./routes/products');
app.use('/products', productsRouter); 


/* 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});  */