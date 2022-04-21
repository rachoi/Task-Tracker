'use strict'

// Load in environment variables

const path = require('path');
require('dotenv').config({ path: "./env"});


const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')



//Database connection
require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const User = mongoose.model("User", new mongoose.Schema({

    email: String,
    firstName: String,
    lastName: String,
    password: String,
    completedTasks: [Object],
    
}))

// const User = connection.models.User;

const getUserByEmail = async (inputEmail) => {
    const list = await User.find({email: inputEmail});
    return list[0];
}

const getUserById = async (inputId) => {
    const list = await User.find({_id: inputId});
    return list[0];
}


const initializePassport = require('./passport-config');
initializePassport(
    passport, 
    email => getUserByEmail(email),
    id => getUserById(id)
);


const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.set('trust proxy', 1);
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(flash());
app.use(methodOverride('_method'))
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 60 * 24,
}))

/*
both middleware below runs at every route
*/

// Initializes passport by adding data to the request object
//reruns passport-config
app.use(passport.initialize());
// If there is a valid cookie, this stage will ultimately call deserializeUser(),
// which we can use to check for a profile in the databaseß
app.use(passport.session());


// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     next();
// });



app.post('/login', checkNotAuthenticated, passport.authenticate('local', { failureRedirect: '/login'}), (req, res) => {
    if(req.user) {
        req.session.passport.user = req.user;
        req.session.user = req.user;
        req.session.save();
        // user sent back to client w/ 202
        res.status(202).send({user: req.user});
    }
});


app.post('/register', checkNotAuthenticated, async function(req, res, next) {
    // Received data, posting the following: req.body

    let list = await User.find({email: req.body.email});
    //checking if email is already being used (if the list is 1, that means an email has already been registered)
    if(list.length === 0) {
        //if not registered before, attempt registration
        try {
            const email = req.body.email;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const password = await bcrypt.hash(req.body.password, 10);
            const completedTasks = req.body.completedTasks;

            const newUser = new User({
                email,
                firstName,
                lastName,
                password,
                completedTasks
            });

            newUser.save()
            .then( 
                () => res.status(200).send({ message: "User successfully registered to DB"})
            )
            .catch(err => 
                res.status(404).json('Error: ' + err)
            );
        }
        catch {
            console.log("Error found");

        }
    }
    else{
        //email found in db, so cannot register again
        res.status(404).json({msg: "Email already in use"});
    }
}) 

app.post('/add', checkAuthenticated, async function(req, res) {
    // Received a put request to add a task to completed List
    let list = await User.find({email: req.user.email});
    if(list.length === 1) {
        //user found
   
        let completedTasks = req.user.completedTasks; //list of current completed tasks
        const task = {
            id: completedTasks.length+1,
            name: req.body.name,
            description: req.body.description,
            elapsedTime: req.body.elapsedTime,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        }
        completedTasks.push(task);

        const newList = { completedTasks: completedTasks };

        User.findOneAndUpdate({email: req.user.email}, newList, {new: true}, function(err, doc){
            if(err){
                return res.send(500, {error: err});
            }
            // Updated transaction list for sender
        });

        res.send("Added new task list successfully");
    }
    else{
        throw 'Error depositing';
    }
})

app.get('/auth', (req, res) => {
    //api call to get user
    res.status(202).send(req.user);
    // console.log(req.user);
    
})

//delete a task frmo the list
app.delete('/delete', checkAuthenticated, (req, res) => {
    //api call to get user
    res.send(req.user);
})

app.delete('/logout', checkAuthenticated, (req, res) => {
    req.logOut();
    req.session.destroy();
    res.clearCookie('connect.sid', {path: '/'});
    res.send({success: true})
    
})

function checkAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {        
        return next(); 
    }
    else{
        console.log("Not auth");
        throw 'Cannot use this route because you are not authenticated';
        //redirect 
    }
    
    
}

function checkNotAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        res.send({message: "Logged in, cannot access a route meant for unauthenticated"})
        throw 'Cannot use this route because you are authenticated';
        //redirect 
    }
    else{
        next();
    }
    
    
}

if(process.env.NODE_ENV === "production") {
    // app.use(express.static(path.join(__dirname, '/frontend/public/build')));
    app.use(express.static("public/build"));

    //reveal frontend to server
    app.use('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
    })
}
else{
    app.get('/', (req, res) => {
        res.send("Task Tracker API");
    });
}


app.listen(port, () => {
    console.log(`Express Server is running on port: ${port}`);
})



