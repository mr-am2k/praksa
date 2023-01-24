const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');

const registerUser = async (req, res) => {
  const sentUser = req.body;
  const exists = await User.find({ username: sentUser.username });

  if (exists.length) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Korisnik sa tim username-om vec postoji' });
  }
  const user = await User.create(sentUser);
  const { ...returnObject } = user._doc;
  delete returnObject.__v;
  res.status(StatusCodes.CREATED).json(returnObject);
};

const loginUser = async (req, res) => {
  const sentUser = req.body;
  const exists = await User.findOne({
    username: sentUser.username,
    password: sentUser.password,
  });
  if (exists === null) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Ne postoji korisnik sa tim podacima' });
  }

  const { ...returnObject } = exists._doc;
  delete returnObject.__v;

  res.status(StatusCodes.OK).json(returnObject);
};

const resetPassword = async (req, res) => {
  const userId = req.params.userId;
  const { oldPassword, newPassword } = req.body;

  if (oldPassword === newPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Nova sifra ne moze biti ista kao stara sifra' });
  }

  const user = await User.findOne({ _id: userId });
  const existingUser = user._doc;

  if (existingUser.password !== oldPassword) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Unijeli ste pogresno staru sifru!' });
  }

  existingUser.password = newPassword;

  const updatedUser = await User.findByIdAndUpdate(
    { _id: userId },
    existingUser,
    { new: true }
  );

  const returnObject = updatedUser._doc;

  res.status(StatusCodes.OK).json(returnObject);
};

module.exports = { registerUser, loginUser, resetPassword };
