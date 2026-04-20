const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    album: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      type: String,
      default: ''
    },
    lyrics: {
      type: String,
      default: ''
    },
    rating: {
      type: String,
      enum: ['nao_gosto', 'mais_ou_menos', 'amo'],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Song', songSchema);
