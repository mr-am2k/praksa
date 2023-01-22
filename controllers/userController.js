const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')

const registerUser = async (req, res) => {
    const sentUser = req.body
    const exists = await User.find({"username": sentUser.username})

    if(exists.length) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: "Korisnik sa tim username-om vec postoji"})
    }
    const user = await User.create(sentUser);
    const {...returnObject} = user._doc;
    delete returnObject.__v
    res.status(StatusCodes.CREATED).json({user:returnObject})
}

const loginUser = async (req, res) => {
    const sentUser = req.body
    const exists = await User.findOne({"username": sentUser.username, "password": sentUser.password})
    if(exists === null){
        return res.status(StatusCodes.BAD_REQUEST).json({message: "Ne postoji korisnik sa tim podacima"})
    }

    const {...returnObject} = exists._doc
    delete returnObject.__v
  
    res.status(StatusCodes.OK).json({user:returnObject})
}

module.exports = {registerUser, loginUser}