const mongoose =  require('mongoose')

const PublicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }],
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
  artists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  }]
})

module.exports = mongoose.models['Publication'] ? mongoose.model('Publication') : mongoose.model('Publication', PublicationSchema)
