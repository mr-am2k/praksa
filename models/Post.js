const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postImageUrl: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  endDate: { type: Date, required: true },
  duration: { type: String, required: true },
  technologies: { type: [String], required: true },
  companyDescription: { type: String, required: true },
  internshipDescription: { type: String, required: true },
  applicationLink: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Post', PostSchema);
