const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.set('strictQuery', false)
    return mongoose.connect('mongodb+srv://am2k:user1234@cluster0.rcdq8q6.mongodb.net/?retryWrites=true&w=majority')
}

module.exports = connectDB
