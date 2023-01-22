const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  typeOfUser: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
