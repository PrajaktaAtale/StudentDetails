const express = require("express");
const connectToMongo = require("./db")
const PORT = process.env.port || 5000;
const app = express();

connectToMongo();

///////userroutes/////
const signUp = require("./route/userRoute")
const signIn = require("./route/userRoute")

///////studentroute////
const studentRoute = require("./route/studentRoute")

const cors= require('cors');

app.use(cors())
app.use(express.json());

////////user////

app.use("/api", signUp)////////http://localhost:5000/api/signUp
app.use("/api", signIn)////////http://localhost:5000/api/signIn

///////student////
app.use("/api/student", studentRoute)//////////http://localhost:5000/api/student

/////////database connection

app.listen(PORT, () =>{
    console.log("Server is running at port " + PORT);
})