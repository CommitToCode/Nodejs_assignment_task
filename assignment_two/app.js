require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');

const connectDB = require('./app/config/dbcon');


const app = express();


connectDB();
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout', 'layout'); 


app.use(session({
  secret: process.env.JWT_SECRET || 'mysecret',
  resave: false,
  saveUninitialized: true
}));


app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use((req, res, next) => {
  res.locals.title = 'My App';
  next();
});


const AuthRoutes = require('./app/routes/authroutes');
const userRoutes = require('./app/routes/userroutes');
const categoryRoutes = require('./app/routes/categoryroutes');
const productRoutes = require('./app/routes/productroutes');
const dashboardCtrl = require('./app/controllers/dashboardcontroller');

app.use('/', AuthRoutes);
app.use('/users', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/products', productRoutes);
const { ensureAuthenticated } = require('./app/middleware/authmiddleware');

app.get('/dashboard', ensureAuthenticated, dashboardCtrl.dashboard);






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
