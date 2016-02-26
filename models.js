/**
 * Load dependencies
 */
var mongoose = require('mongoose')
  , Schema   = require('mongoose.Schema');


/**
 * Schemas
 */
var UserSchema = new Schema({
  'username': String,
  'password': String,
  'submitted_posts': [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  'liked_posts': [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

var PostSchema = new Schema({
  'text': String,
  'img_src': String,
  'user': { type: Schema.Types.ObjectId, ref: 'User' },
  'category': { type: Number, ref: 'Category'},
  'upvotes': Number,
  'downvotes': Number,
  'comments': { type: Schema.Types.ObjectId, ref: 'Comment'}
});

var CommentSchema = new Schema({
  'user': { type: Schema.Types.ObjectId, ref: 'User' },
  'text': String,
  'upvotes': Number,
  'downvotes': Number
});

var CategorySchema = new Schema({
  '_id': Number,
  'name': String
});


/**
 * Models
 */
exports.User = Mongoose.model('User', UserSchema);
exports.Post = Mongoose.model('Post', PostSchema);
exports.Comment = Mongoose.model('Comment', CommentSchema);
exports.Category = Mongoose.model('Category', CategorySchema);
