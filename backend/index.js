const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const countries = require('./flages.json');
const { AuntenticateUser } = require('./src/middleware/Auth.js');
// const sqlinjection = require('sql-injection');



const router = require('./src/routes/routes.js');
const { DB } = require('./src/config/index.js');


// http://host:port/endPoint
// host = localhost
// port = 3000
// endPoint = data

/*
   for req app need to understand JSON (javascript object notation)

   use => global middleware (app will understand JSON)
*/

const corsOptions = {
  origin: 'http://localhost:3000', // Allow only requests from this origin
  methods: 'GET,POST', // Allow only these methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};

app.use(express.json());
app.use(helmet());
// app.use(sqlinjection());
app.use(cors(corsOptions));

// app.post('/data', (reqest, response) => {
//     const body = reqest.body;
//     response.status(200).send(body);
// })


app.get('/flag', AuntenticateUser, async (req, res) => {
  try {
    return res.send(countries);
  } catch (err) {
    return res.status(500).send({ error: true, message: err.message })
  }
})

app.get('/flag/:id', AuntenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const isoAlpha3 = countries.map(item => item.isoAlpha3);
    const obj = countries.find(item => item.isoAlpha3 === id);
    return res.send({ obj, isoAlpha3 });
  } catch (error) {
    return res.status(500).send({ error: true, message: err.message })

  }
})

app.use('/api', router);

// http://localhost:3000/api/users


async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log('Connected!')
  } catch (error) {
    console.error('Error', err.message)
  }
}

connectMongo()

const PORT = process.env.PORT ?? 3000

app.listen(PORT);
console.log(`app is listening on port ${PORT}`)


/*
   method of apis
   1) get API => get some data based on req
   2) post API => insert data based on req
   3) Update API => update data 
   4) delete API => delete the data

   status code =


*/


/*
  mkdir folder_name
  cd folder_name
  npm init 
  npm install <package_name> 
   for Ex:- npm install express

  touch .gitignore
  npm start
  npm run dev
*/