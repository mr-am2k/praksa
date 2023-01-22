const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullName:{type:String},
    username:{type:String},
    password:{type:String},
    typeOfUse:{type:String}
})

module.exports = mongoose.model('User', UserSchema)
