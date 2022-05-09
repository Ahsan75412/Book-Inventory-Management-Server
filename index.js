const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
 
 
//use middleware
 
app.use(cors());
app.use(express.json());
 
//password :LUIJdCIxm0phFys2
//user: booksUser
 
//connect applications


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bewwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

}
//must call run() 
run().catch(console.dir);


 
app.get('/', (req, res) => {
    res.send('Running Book Inventory System');
});
 
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});