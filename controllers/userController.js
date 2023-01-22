const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')

const registerUser = async (req, res) => {
    const sentUser = req.body
    const user = await User.create(sentUser);
    const {...returnObject} = user._doc;
    res.status(StatusCodes.CREATED).json({user:returnObject})
}

module.exports = {registerUser}