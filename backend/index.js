import express, { json } from "express";
import {PORT, mongoDBURL}from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/booksmodel.js";
import booksRoute from './Routes/booksRoute.js';
import cors from 'cors';

const app = express();

//Middleware to parse request body
app.use(express.json());

//Middleware for Handling CORS POLICY.
//OPT:1 alow all Cross Policy by default
app.use(cors())

/*OPT:2Allow Custom Origin.
app.use(cors({
    origin: 'http://localhost:5174',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content.Type']
}))
*/
app.use('/books', booksRoute);

app.get('/', (request,response)=>{
    console.log(request);
    return response.status(234).send('Welcome to MERN stack App')
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to database');
    app.listen(PORT, ()=>{
        console.log(`App listening to port: ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error)
})
