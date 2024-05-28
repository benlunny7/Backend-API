require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const videoRoutes = require('./routes/videoRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const FRONTEND = process.env.FRONTEND;
const DEFAULT_DB_NAME = process.env.DEFAULT_DB_NAME;

const corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', videoRoutes);
app.get('/', (req, res) => {
    res.send('Hello NODE API');
});
app.use(errorMiddleware);

// Connect to MongoDB with default DB
const connectToMongoDB = (dbName = DEFAULT_DB_NAME) => {
    const dbUri = process.env.MONGO_URL.replace('databaseName', dbName);
    mongoose.connect(dbUri)
        .then(() => console.log(`Connected to MongoDB: ${dbName}`))
        .catch(err => console.error('Could not connect to MongoDB:', err));
};

// Connect to the default database on start
connectToMongoDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
