const express = require('express');
const app = express();
const mongoose = require('mongoose');


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


app.use(express.json());

// app.post('/data', (reqest, response) => {
//     const body = reqest.body;
//     response.status(200).send(body);
// })

app.use('/api', router);

// http://localhost:3000/api/users


async function connectMongo() {
  try {
    await mongoose.connect(DB);
    console.log('Connected!')
  } catch (error) {
    console.error('Error', err.message)
  }
}

connectMongo()


app.listen(3000);
console.log("app is listening on port 3000")


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