const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const emailRoutes = require('./routes/email.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);

module.exports = app;