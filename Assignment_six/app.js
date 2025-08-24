require('dotenv').config();
const express = require('express');
const connectDB = require('./app/config/dbcon');
const { swaggerUi, specs } = require("./swagger");

const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Routes
app.use('/api/auth', require('./app/routes/authroutes'));
app.use('/api/users', require('./app/routes/userroutes'));
app.use('/api/courses', require('./app/routes/courseroutes'));
app.use('/api/batches', require('./app/routes/batchroutes'));
app.use('/api/enrollments', require('./app/routes/enrollmentroutes'));
app.use('/api/attendance', require('./app/routes/attendanceroutes'));
app.use('/api/exams', require('./app/routes/examroutes'));
app.use('/api/reports', require('./app/routes/reportroutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
