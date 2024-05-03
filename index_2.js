import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/test-db')
.then(()=> {
    console.log("connected to mongodb");
})
.catch((error) => {
    console.error("error connecting to mongodb: ", error)
})