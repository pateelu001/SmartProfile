// This file will access users and
// create new user records in database along
// with some other fields of user
// If collection exists record will be updated
// else record will be updated or created after
// creating collection look at line 19

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  profileId: String,
  name: String,
  displayName: String,
  email: String,
  authType: String
});

mongoose.model('appUsers', userSchema);
