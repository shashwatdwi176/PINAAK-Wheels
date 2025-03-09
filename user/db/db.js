const mongoose = require('mongoose')

function connect(){
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('User Service Connected to MongoDB')
    }).catch((err) => {
        console.log('Error connecting user to MongoDB', err)
    })
}

module.exports = connect;