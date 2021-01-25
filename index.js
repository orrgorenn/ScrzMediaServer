const express = require('express');
const cors = require('cors');
const env = require('dotenv');
const mongoose = require('mongoose');
const usersRoutes = require('./src/routes/users');
const buildingsRoutes = require('./src/routes/buildings');
const authRoutes = require('./src/routes/auth');
const elementsRoutes = require('./src/routes/elements');

// Env
env.config();

const app = express();
const PORT = process.env.PORT || 2058;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGOURI;
// MongoDB Connection
const connect = mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));
	
// Routes
app.use('/users', usersRoutes);
app.use('/buildings', buildingsRoutes);
app.use('/auth', authRoutes);
app.use('/elements', elementsRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
