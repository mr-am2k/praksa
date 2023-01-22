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
    res.status(StatusCodes.CREATED).json({user:returnObject})
}

const loginUser = async (req, res) => {
    const sentUser = req.body
    const exists = await User.find({"username": sentUser.username, "password": sentUser.password})
    console.log(exists)
    if(!exists.length){
        return res.status(StatusCodes.BAD_REQUEST).json({message: "Ne postoji korisnik sa tim podacima"})
    }

    res.status(StatusCodes.OK).json({user:exists})
}

module.exports = {registerUser, loginUser}