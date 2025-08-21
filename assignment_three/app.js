const express=require('express')
const dbcon=require('./app/config/dbcon')
const path=require('path')
const cors = require("cors");
const dotenv=require('dotenv').config()
dbcon()
const app=express()

app.use(express.static(__dirname + '/public'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

const authroute=require('./app/routes/Authroute')
app.use('/api',authroute)
const productroute=require('./app/routes/Productroute')
app.use('/api',productroute)
const categoryroute=require('./app/routes/Categoryroute')
app.use('/api',categoryroute)
const port = 5000;
app.listen(port, () => {
  console.log("app running at port", port);
});
    
