const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();

const { dbcon } = require('./app/config/dvcon');

const authRoutes = require('./app/routes/authroutes');
const userRoutes = require('./app/routes/userroutes');
const questionRoutes = require('./app/routes/questionroutes');
// const profileRoutes = require('./app/routes/profileroutes');
const categoryRoutes = require('./app/routes/categoryroutes'); 
const answerRoutes = require('./app/routes/answerroutes'); 

dbcon();

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/question', questionRoutes);
// app.use('/api/profile', profileRoutes);
app.use('/api/category', categoryRoutes); 
app.use('/api/answer', answerRoutes); 

app.listen(process.env.PORT, () => {
  console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
