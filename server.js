// import our dependencies
const express = require("express")
const app = express()
const mysql = require('mysql2');
const dotenv = require('dotenv')

// configure environment variables
app.use(express.json());
dotenv.config();

// create a connection object
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

//test the connection
db.connect((err) => {
    //if the connection is not successful
    if(err) {
        console.log("error connecting to the database: ", err)
    }

    //connection is successful
    console.log("Successfully connected to mySQL: ",db.threadId)
})
// tis is not important for the assignment
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//retrieve all patients
app.get('', (req, res) => {
    const getPatients = "SELECT first_name, last_name FROM patients"
    db.query(getPatients, (err, data) =>{
        //if i have an error
        if(err) {
            return res.status(400).send("Failed to get patients", err)
        }
        // no error
        res.status(200).send(data)
    })
})

//retrieve all providers
app.get('/providers',(req, res) =>{
    const getproviders = "SELECT  first_name, last_name , provider_specialty FROM patients";
    db.query(getProviders, (err,data) =>{
        // if i have an error
        if(err) {
            return res.status(400).send("Failed to get providers", err);

        }
        // no error
        res.status(200).send(data);
    }); 
});
//retrieve all patients by firstName
app.get('/patients/:first_name',(req, res) =>{
    const first_name =req.params.first_name;
    const query ='SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';

    db.query(query, [firstName], (err, data) =>{
        //if i have an error
        if(err) {
            return res.status(400).send("Failed to get the patients", err);
        }
        res.status(200).send(data);
    });
});
//retrieve all providers by Specialty ***
app.get('/providers/specialty/:specialty',(req, res) =>{
    const specialty = req.params.specialty;
   const getproviders ='SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';

    db.query(query, [specialty], (err, data) =>{
        //if i have an error
        if(err) {
            return res.status(400).send("Failed to get the providers_specialty", err);
        }
        res.status(200).send(data);
    });
});
// start and listen to the server
app.listen(3300, () => {
     console.log(`server is running on port 3300....`)
})
