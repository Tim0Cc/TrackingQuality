const mongoose =  require('mongoose')
// delete mongoose.models['Link'];
// delete mongoose.connection.collections['links'];
// delete mongoose.modelSchemas['Link'];
// delete mongoose.models['link'];
// delete mongoose.connection.collections['Links'];
// delete mongoose.modelSchemas['link'];

const LinkSchema = new mongoose.Schema({
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
  },
  artists: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  }],
  publications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publication'
  }]
})

module.exports = mongoose.model('Link', LinkSchema)