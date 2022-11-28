const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ufiao9v.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
      const categoriesCollection = client.db('resaleFurniture').collection('categories');
      const productsCollection = client.db('resaleFurniture').collection('products');

     app.get('/categories', async(req, res) => {
      const query = {};
      const category = await categoriesCollection.find(query).toArray();
      res.send(category);
     });

     app.get('/categories/:id', async(req, res) => {
      const id = req.params.id;
      const query = {id : (id)};
      const cursor = productsCollection.find(query);
      const product = await cursor.toArray() 
      res.send(product);
     });

   

}
finally {

}
}
run().catch(console.log);

app.get('/', (req, res) => {
  res.send('furniture resale')
})

app.listen(port, () => {
  console.log(`furniture resale app listening on port ${port}`)
})