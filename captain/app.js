const dotenv = require('dotenv')
dotenv.config()

const express = require("express")
const app = express();

const connect = require('./db/db')
connect()
const captainRoutes = require("./routes/caption.routes")
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use("/", captainRoutes)
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

module.exports = app;