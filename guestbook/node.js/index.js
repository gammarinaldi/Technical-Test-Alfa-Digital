const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');
const cors = require('cors');
const app = express();
const port = 1988;

app.use(cors()); //Supaya API bisa diakses oleh axios (front end)
app.use(bodyParser.json()); //Untuk menerima json melalui req.body
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.get('/getguests', db.getGuests);
app.post('/createguest', db.createGuest);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});