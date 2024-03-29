// const express = require("express");
import dotenv from 'dotenv' // for the dot env package
import express from 'express';
import mongoose from 'mongoose'; // import the mongoose package for db 
import { Task } from './Models/task.models.js';
import cors from 'cors';

const app = express(); // express server created.
dotenv.config();
app.use(cors(
    {
        origin: "*"
    }
));

app.use(express.urlencoded({ extended: false }));

app.use(express.json()); // to let the express use json syntax.

// Database Connection 
// mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
//     console.log('db connected successfully')
// }).catch(() => {
//     console.log('error occurred')
// })

// 2nd way of DB Connection

const connectDB = async () => {
    try {
        const connectionStream = await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log(connectionStream.connection.host);
    } catch (error) {
        console.log(`MongoDB Connection Error Occured ${error}`);
        process.exit();
    }
}

connectDB();

const port = process.env.PORT || 3000; // this will read the port from dotenv file

app.get('/', (req, res) => {
    res.status(200).json({
        "message": "you are successfully connected to the backend server"
    })
});

// get all task stored in the databae
app.get('/api/getAllTask', (req, res) => {
    Task.find().then(result => res.status(200).json(result)).catch(err => res.status(404).json(err))
})

// add a task given in user's request body
app.post('/api/addTask', (req, res) => {

    const task2 = req.body.task;

    console.log(req.body);

    Task.create({
        task: task2
    }).then(result => res.status(201).json(result)).catch((err) => {
        console.log(task2);
        res.status(202).json(err);
    })
})

// mark the task as completed
app.put('/api/markCompleted/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);

    Task.findByIdAndUpdate({ _id: id }, { done: true }).then(result => res.status(200).json(result)).catch(err => res.status(404).json(err))

})

// update the task as given by user
app.put('/api/update/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);

    const updatedTask = req.body.task;
    console.log(updatedTask);

    Task.findByIdAndUpdate({ _id: id }, { task: updatedTask }).then(result => res.status(200).json(result)).catch(err => res.status(404).json(err))
})

// delete the task given by id
app.delete('/api/deleteTask/:id', (req, res) => {
    const id = req.params.id;
    console.log('Deleted Api route ' + id);

    Task.findByIdAndDelete({ _id: id }).then(result => { res.status(200).json(result) }).catch(err => res.status(404).json(err))
})

app.listen(port, () => {
    // console.log('server is listening on port' + port);
    console.log(`server is listening on port ${port}`); // ES6 Standard
});

