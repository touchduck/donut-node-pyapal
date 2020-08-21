const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  password: String,
  token: String
});

UserSchema.virtual('date').get( () => {
  return this._id.getTimestamp();
});

mongoose.model('User', UserSchema);
