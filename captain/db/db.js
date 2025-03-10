const mongoose = require('mongoose')

function connect(){
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log('Captain Service Connected to MongoDB')
    }).catch((err) => {
        console.log('Error connecting captain to MongoDB', err)
    })
}

module.exports = connect;