const dotenv = require('dotenv')
dotenv.config()

const express = require("express")
const app = express();
const userRoutes = require("./routes/user.routes")
const cookieParser = require('cookie-parser')

app.use("/" , userRoutes)
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

module.exports = app;