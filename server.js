// Dependencies
const express = require("express");
const path = require('path');
const logger = require("morgan");

const connectDB = require("./config/connectDB.js");

// Models
const db = require("./models");

// Express app.
let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, '/public')));

// Set the port of our application, process.env.PORT lets the port be set by Heroku
let PORT = process.env.PORT || 3001;


//Routes

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stats.html'));
});

//GET REQUESTS


app.get("/api/workouts", (req, res) => {
    db.Workout.find().sort({ day: -1 })
        .then(dbWorkout => {
            //console.log('dbWorkout', dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

//PUT REQUESTS

app.put("/api/workouts/:id", (req, res) => {

    let urlData = req.params;
    let data = req.body;
    db.Workout.updateOne({ _id: urlData.id }, {
            $push: {
                exercises: [{
                    "type": data.type,
                    "name": data.name,
                    "duration": data.duration,
                    "distance": data.distance,
                    "weight": data.weight,
                    "reps": data.reps,
                    "sets": data.sets
                }]
            }
        }).then(dbUpdate => {
            res.json(dbUpdate);
        })
        .catch(err => {
            res.json(err);
        });

});

//POST REQUESTS

app.post("/api/workouts", (req, res) => {

    let data = req.body;

    db.Workout.create({
            day: new Date().setDate(new Date().getDate())
        }).then(dbUpdate => {
            res.json(dbUpdate);
        })
        .catch(err => {
            res.json(err);
        });
});


connectDB()

// Start server
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});