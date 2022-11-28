const express = require('express')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const port = process.env.PORT || 5000;

middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ufiao9v.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
      const livingRoomCollection = client.db('resaleFurniture').collection('livingroom');
      const bedRoomCollection = client.db('resaleFurniture').collection('bedroom');
      const dinningRoomCollection = client.db('resaleFurniture').collection('dinnning');

     

     
      
      

    /***
     * API Naming Convention 
     * app.get('/bookings')
     * app.get('/bookings/:id')
     * app.post('/bookings')
     * app.patch('/bookings/:id')
     * app.delete('/bookings/:id')
    */

   

   

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