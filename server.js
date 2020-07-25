const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex ({
    client: 'pg', // postgreSQL
    connection: {
      host : '127.0.0.1', // localhost
      user : 'postgres',
      password : 'DataBase2020',
      database : 'smartbrain'
    }
});
// knex.js will allow me to connect my database to server.js file

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send(database.users) })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })  
// insert users when they register

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) }) 
// get user profile

app.put('/image', (req, res) => { image.handleImage(req, res, db) })
// update entries

app.post('/imageurl', (req, res) => { image.handleAPICall(req, res) })

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

console.log(PORT);