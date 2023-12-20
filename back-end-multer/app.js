const express= require('express');
const connectDB = require('./confiq/db');
const app = express();
const dotenv = require('dotenv').config()
const TacheRoutes= require('./Routes/Tache.routes')
const bobyParser= require('body-parser')
const cors= require('cors')
connectDB();


app.use(bobyParser.json())
app.use(bobyParser.urlencoded({extended: true}))
app.use(cors())

app.use('/api/tache', TacheRoutes)

app.listen(process.env.PORT, ()=> console.log('le serveur a demarrer au port :'+ process.env.PORT))
