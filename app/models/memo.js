const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemoSchema = new Schema({
  text: String
});

MemoSchema.virtual('date').get( () => {
  return this._id.getTimestamp();
});

mongoose.model('Memo', MemoSchema);
