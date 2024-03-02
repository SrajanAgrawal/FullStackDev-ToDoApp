// const express = require("express");
import dotenv from 'dotenv' // for the dot env package
import express from 'express';
import mongoose from 'mongoose'; // import the mongoose package for db 
import { Todo } from "./Models/todo.models.js"
const app = express();



dotenv.config();

// Database Connection 
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('db connected successfully')
}).catch(() => {
    console.log('error occurred')
})


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('home route changed');
});

// /api/getAllTask
app.get('/api/getAllTask', (req, res) => {

});

app.post('/api/addTask', (req, res) => {
    const task = req.body.task;
    Todo.create({
        name: task
    }).then(result => res.json(result))
        .catch(err => res.json(err))
})

app.listen(port, () => {
    // console.log('server is listening on port' + port);
    console.log(`server is listening on port ${port}`); // ES6 Standard
});
