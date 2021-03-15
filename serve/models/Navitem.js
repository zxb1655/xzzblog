const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    navs: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Nav',
      },
    ],
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
    body: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Navitem', schema);
