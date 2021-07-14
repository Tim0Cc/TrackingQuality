const mongoose =  require('mongoose')

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // type: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true
  // }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Artist', ArtistSchema)