const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

// middleware
// app.use(cors());
// app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ufiao9v.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/', (req, res) => {
  res.send('furniture resale')
})

app.listen(port, () => {
  console.log(`furniture resale app listening on port ${port}`)
})