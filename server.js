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
/* 
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
app.options('*', cors(corsOptions)); // preflight OPTIONS; put before other routes
app.listen(80, function(){
  console.log('CORS-enabled web server listening on port 80');
}); */

require('dotenv').config();


app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || process.env.ATLAS_URI, {
   useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
   
app.get('/', (req, res) => {
	res.send('Hello from MERN');
});

const productsRouter = require('./routes/products');
app.use('/products', productsRouter); 


if (process.env.NODE_ENV === 'production') {
  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });
}


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});