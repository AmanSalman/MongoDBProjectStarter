import express from 'express';
import { connectDB } from './DB/connection.js';
import dotenv from 'dotenv';
import { initApp } from './src/app.router.js';

/* CONFIGURATION */
dotenv.config();
const app = express();

initApp(app,express);
const PORT = process.env.PORT || 3000;
connectDB().then(()=>app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})).catch((err)=>{
    console.log(`error detected: ${err}`);
});


 