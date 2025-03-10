const dotenv = require('dotenv')
dotenv.config()

const express = require("express")
const app = express();

const connect = require('./db/db')
connect()
const userRoutes = require("./routes/user.routes")
const cookieParser = require('cookie-parser')
const rabbitMq = require('./service/rabbit')

rabbitMq.connect()

app.use(express.json());
app.use("/", userRoutes)
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

module.exports = app;