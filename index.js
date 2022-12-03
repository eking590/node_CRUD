// import express 
const express = require('express') 
//import uuid for generating id automatically 
const uuid = require('uuid'); 
//import file path using node 
const path = require('path')
//import moment module to determine the date

//import the logger module 
const logger = require('./middleware/logger'); 




//initialize express 

const app = express() 

//create a middleware function named logger 


//initiate our logger 
// app.use(logger); 

//body parser middleware 

app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 

//set a static folder 
app.use(express.static(path.join(__dirname,'public'))); 

//import the members api routes
app.use('/api/members', require('./routes/api/members')); 

//run the web server by listenning to a port 
const PORT = process.env.PORT || 8000; 


app.listen(PORT,() => console.log(`Server running on port ${PORT}`)); 