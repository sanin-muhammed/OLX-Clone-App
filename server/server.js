const express = require('express')
const morgan = require('morgan');
const colors = require('colors');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
require("dotenv").config();
const PORT = process.env.PORT
const app = express()





app.use(morgan('dev'));
connectDB()
app.use(express.urlencoded())
app.use(cors())
app.use(express.json());
app.use(express.static('uploads'))

// Use cookie-parser middleware
app.use(cookieParser());

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')

app.use('/api',authRoutes);
app.use('/api',productRoutes);

app.listen(PORT, () => console.log(` app listening on port ${PORT}!`))