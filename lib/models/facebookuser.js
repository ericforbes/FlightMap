'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var FacebookUserSchema = new Schema({
  fbUid: {
    type: String,
    unique: true,
    required: true
  },
  displayName: String,
  profileUrl : String,
  accessToken: String,
  provider: String
});


FacebookUserSchema
  .virtual('user_info')
  .get(function () {
    return { '_id': this._id, 'fbUid': this.fbUid, 'username': this.displayName};
  });

/**
 * Validations
 */

FacebookUserSchema.path('fbUid').validate(function(value, respond){
  mongoose.models["FacebookUser"].findOne({id: value}, function(err, user){
    console.log('validate');
    if (err) throw err;
    if (user) return respond(false);
    response(true);
  });
}, 'The specified Facebook Profile ID is already in use.');



mongoose.model('FacebookUser', FacebookUserSchema);