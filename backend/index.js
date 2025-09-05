const express = require('express');
const app = express();
const mongoose = require('mongoose');
 require('dotenv').config();
const helmet = require('helmet');
 const cors = require('cors');
const sqlinjection = require('sql-injection');



const router = require('./src/routes/routes.js');
const {DB} = require('./src/config/index.js');


// http://host:port/endPoint
// host = localhost
// port = 3000
// endPoint = data

/*
   for req app need to understand JSON (javascript object notation)

   use => global middleware (app will understand JSON)
*/

 let corsOptions = {
        origin: ['http://localhost:5000'], // Specify allowed origins
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
        optionsSuccessStatus: 200 // For legacy browser support
 };

app.use(express.json());
app.use(helmet());
app.use(sqlinjection());
app.use(cors(corsOptions));

// app.post('/data', (reqest, response) => {
//     const body = reqest.body;
//     response.status(200).send(body);
// })

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