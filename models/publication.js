const mongoose =  require('mongoose')
// delete mongoose.connection.models['Publication']
// delete mongoose.models['Publication'];
// delete mongoose.connection.collections['publications'];
// delete mongoose.modelSchemas['Publication'];
// delete mongoose.models['publication'];
// delete mongoose.connection.collections['Publications'];
// delete mongoose.modelSchemas['publication'];

const PublicationSchema = new mongoose.Schema({
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
  }]
})

module.exports = mongoose.model('Publication', PublicationSchema)