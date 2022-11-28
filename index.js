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


function verifyJWT(req, res, next) {

  const authHeader = req.headers.authorization;
  if (!authHeader) {
      return res.status(401).send('unauthorized access');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
      if (err) {
          return res.status(403).send({ message: 'forbidden access' })
      }
      req.decoded = decoded;
      next();
  })

}

async function run() {
  try {
      const categoriesCollection = client.db('resaleFurniture').collection('categories');
      const productsCollection = client.db('resaleFurniture').collection('products');
      const bookingsCollection = client.db('resaleFurniture').collection('bookings');
      const usersCollection = client.db('resaleFurniture').collection('users');
      const doctorsCollection = client.db('resaleFurniture').collection('doctors');
      const paymentsCollection = client.db('resaleFurniture').collection('payments');

       // NOTE: make sure you use verifyAdmin after verifyJWT
       const verifyAdmin = async (req, res, next) => {
        const decodedEmail = req.decoded.email;
        const query = { email: decodedEmail };
        const user = await usersCollection.findOne(query);

        if (user?.role !== 'admin') {
            return res.status(403).send({ message: 'forbidden access' })
        }
        next();
    }

     // Use Aggregate to query multiple collection and then merge data
     app.get('/products', async (req, res) => {
      const date = req.query.date;
      const query = {};
      const options = await productsCollection.find(query).toArray();

      // get the bookings of the provided date
      const bookingQuery = { appointmentDate: date }
      const alreadyBooked = await bookingsCollection.find(bookingQuery).toArray();

      // code carefully :D
      options.forEach(option => {
          const optionBooked = alreadyBooked.filter(book => book.treatment === option.name);
          const bookedSlots = optionBooked.map(book => book.slot);
          const remainingSlots = option.slots.filter(slot => !bookedSlots.includes(slot))
          option.slots = remainingSlots;
      })
      res.send(options);
  });

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