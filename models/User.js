const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullName:{type:String},
    username:{type:String},
    password:{type:String},
    typeOfUser:{type:String}
})

module.exports = mongoose.model('User', UserSchema)
