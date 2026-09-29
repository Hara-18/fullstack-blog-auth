const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    tlsAllowInvalidCertificates: true
})
.then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error('Database connection failed explicitly:', err.message);
});

const authRoute = require('./routes/auth');

// Routes middleware
app.use('/api/auth', authRoute);

const postRoute = require('./routes/posts');

// Routes middleware
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);