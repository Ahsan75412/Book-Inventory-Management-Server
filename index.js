const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
 
 
//use middleware
 
app.use(cors());
app.use(express.json());
 
 

 
app.get('/', (req, res) => {
    res.send('Running Book Inventory System');
});
 
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});