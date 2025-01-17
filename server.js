const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const productRoute = require('./routes/productRoutes')
const errorMiddleware = require('./middlewares/errorMiddleware')
require('dotenv').config();
const app = express();

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000
const FRONTEND = process.env.FRONTEND

var corsOptions = {
    origin: FRONTEND,
    optionSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api', productRoute)


app.get('/', (req, res) => {
    res.send("Hello there!");
})

app.use(errorMiddleware);

mongoose.connect(MONGO_URL)
.then(() => {
    app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
    })
    console.log("Connected to MongoDB")})
    .catch((error) => console.log(error));