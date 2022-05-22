const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');

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

// review collection
const reviewCollection = client.db('bookInventory').collection('review');
const orderCollection = client.db('bookInventory').collection('order');
async function run() {
    try {
        await client.connect();
        const productCollection = client.db('bookInventory').collection('product');
        // const reviewCollection = database.collection('review');

        // Auth JWT
        app.post('/login',async(req,res)=>{
            const user = req.body;
            const accessToken = jwt.sign(user , process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '1d'
            });
            res.send({accessToken});

        })




        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        //get single Load-data from database by API
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const product = await productCollection.findOne(query);
            res.send(product);

        });

        //post a data from input fields to client side
        app.post('/product', async (req, res) => {
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct);
            res.send(result);
        });

        //update a data from input fields to client side

        app.put('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const newQuantity = req.body.updatedQuantity;
            const result = await productCollection.updateOne(query, { $set: { quantity: newQuantity } }, options);
            res.json(result);

        });

        // delete a data 
        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await productCollection.deleteOne(query);
            res.json(result);
        })

        // add/post a  reviews
        app.post('/review', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            console.log(review);
            res.json(result);
        });

        // get all reviews
        app.get('/review', async (req, res) => {
            const cursor = reviewCollection.find({});
            const reviews = await cursor.toArray();
            res.send(reviews);
        });


        // get a order collection
        app.get('/order', async (req, res) => {
            const cursor = orderCollection.find({});
            const orders = await cursor.toArray();
            res.send(orders);
        })

        // post a order collection
        app.post('/order', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.json(result);
        })

        // filter items for get the user mail

        app.post('/items', async (req, res) => {
            const email = req.body.author;
            const query = { email: email };
            const cursor = await productCollection.find(query).toArray();
            res.send(cursor);

        });


    }
    finally {
        // await client.close();
    }

}
//must call run() 
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Running Book Inventory System');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});