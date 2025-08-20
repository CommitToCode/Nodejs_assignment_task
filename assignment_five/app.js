require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

const connectDB = require('./app/config/dbcon');
const errorHandler = require('./app/middleware/errorhandler');


connectDB();

const app = express();


app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));


app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));


app.use('/api/auth', require('./app/routes/authroutes'));
app.use('/api/users', require('./app/routes/userroutes'));
app.use('/api/movies', require('./app/routes/movieroutes'));
app.use('/api/theaters', require('./app/routes/theaterroutes'));
app.use('/api/bookings', require('./app/routes/bookingroutes'));
app.use('/api/reports', require('./app/routes/reportroutes'));

app.get('/', (req, res) => res.send('Movie Booking API running'));


app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
