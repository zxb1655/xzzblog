const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    categories: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Category',
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
    read: {
      type: Number,
    },
    isOriginal: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Article', schema);
