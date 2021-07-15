const mongoose =  require('mongoose')

const LinkSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  linkUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  linkType: {
    type: String,
    required: true
  },
  artists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  }],
  publications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publication'
  }],
  institutions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institution'
  }]
})

module.exports = mongoose.model('Link', LinkSchema)