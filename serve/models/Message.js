const mongoose = require("mongoose")
const schema = new mongoose.Schema({
  nickName: {
    type: String
  },
  avatarImg: {
    type: String
  },
  content: {
    type: String
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  parent: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Message'
  },
  byAiteName: {
    type: String
  },
}, {
  timestamps: true
})
module.exports = mongoose.model('Message', schema)