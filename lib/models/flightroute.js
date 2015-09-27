'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var FlightRouteSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  created: Date,
  updated: [Date],
  creator: {
    type: Schema.ObjectId,
    ref: 'FacebookUser'
  }
});

/**
 * Pre hook.
 */

FlightRouteSchema.pre('save', function(next, done){
  if (this.isNew){
    this.created = Date.now();
  }
  
  this.updated.push(Date.now());

  next();
});

/**
 * Statics
 */
FlightRouteSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).populate('creator', 'fbUid').exec(cb);
  }
};


/**
 * Define model.
 */

mongoose.model('FlightRoute', FlightRouteSchema);