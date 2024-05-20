require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const videoRoutes = require('./routes/videoRoutes');
const errorMiddlware = require('./middleware/errorMiddleware')
const cors = require('cors')

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000
const FRONTEND = process.env.FRONTEND

var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', videoRoutes)

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.use(errorMiddlware);

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB")

        app.listen(PORT, () => {
            console.log(`Node API app is running on port ${PORT}`)
        })
    }).catch((error) => { console.log(error) })