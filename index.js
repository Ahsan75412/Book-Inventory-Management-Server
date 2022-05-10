const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
 
 
//use middleware
 
app.use(cors());
app.use(express.json());
 
//password :LUIJdCIxm0phFys2
//user: booksUser
 
//connect applications

//Product url: http://localhost:5000/product

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bewwo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const productCollection = client.db('bookInventory').collection('product');

     app.get('/product' , async (req,res) => {
        const query = {};
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        res.send(products);
     });

       //get single Load-data from database by API
       app.get('/product/:id', async(req,res)=>{
        const id = req.params.id;
        const query = {_id: new ObjectId(id)};
        const product = await productCollection.findOne(query);
        res.send(product);
        
    });


    }
    finally{
        // await client.close();
    }

}
//must call run() 
run().catch(console.dir);


 
app.get('/', (req, res) => {
    res.send('Running Book Inventory System');
});
 
app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});