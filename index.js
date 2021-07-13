//SERVER SIDE FILE

//create package.json ->run 'npm init' command line (project folder)
//install node package express npm -> run 'npm intall express'

//obs.: 'npm install -g nodemon' makes easier to see changes, you dont need to restart the server to see changes. (-g its global)

//DATABASE: MongoDB, mLab, SQL but to work with small database NeDB free runs with node

//NeDB command line: 'npm intall nedb'

//express require------------------------
const express = require('express');
const Datastore = require('nedb');

const app = express(); //create the app
app.listen(3000, () => console.log('listening at 3000')); //listen at the port
//go to script folder, run command 'node script.js' to start to listen/ with nodemon intalled use 'nodemon script.js'
//ctrl + c to stop listening

//serve web pages
app.use(express.static('public'));

//next step is to set route
//more info: https://expressjs.com/en/guide/routing.html

//now you need to parse json file with express.json method, more info: https://expressjs.com/en/api.html#express.json
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db'); //create a database file
database.loadDatabase(); //load the data into memory

//POST request----------------------------
//send response
app.post('/api', (request, response) => {

    const data = request.body;//receive data
    const timestamp = Date.now(); //set timestamp
    data.timestamp = timestamp;
    database.insert(data); //every time click on button store data in array into database
    response.json(data); //send everything back as json
});

//GET SELFIE APP-------------------------

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    })
});