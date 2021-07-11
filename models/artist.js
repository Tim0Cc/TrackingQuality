const mongoose =  require('mongoose')
// delete mongoose.models['Artist'];
// delete mongoose.connection.collections['artists'];
// delete mongoose.modelSchemas['Artist'];
// delete mongoose.models['artist'];
// delete mongoose.connection.collections['Artists'];
// delete mongoose.modelSchemas['Artist'];

const ArtistSchema = new mongoose.Schema({
  name: {
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
  }
})

module.exports = mongoose.model('Artist', ArtistSchema)