const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

// middleware
// app.use(cors());
// app.use(express.json());

app.get('/', (req, res) => {
  res.send('furniture resale')
})

app.listen(port, () => {
  console.log(`furniture resale app listening on port ${port}`)
})