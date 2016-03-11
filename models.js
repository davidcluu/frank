/**
 * Load dependencies
 */
var mongoose = require('mongoose')
  , Schema   = mongoose.Schema;


/**
 * Schemas
 */
var UserSchema = new Schema({
  'username': String,
  'password': String,
  'submitted_posts': [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  'voted_posts': [new Schema({
    'post': { type: Schema.Types.ObjectId, ref: 'Post' },
    'vote': String
  })]
});

var PostSchema = new Schema({
  'title': String,
  'img_src': String,
  'user': { type: Schema.Types.ObjectId, ref: 'User' },
  'category': { type: Number, ref: 'Category'},
  'upvotes': Number,
  'downvotes': Number,
  'comments': [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
});

var CommentSchema = new Schema({
  'text': String,
  'upvotes': Number,
  'downvotes': Number
});

var CategorySchema = new Schema({
  '_id': Number,
  'category': String,
  'short': String
});


/**
 * Models
 */
exports.User = mongoose.model('User', UserSchema);
exports.Post = mongoose.model('Post', PostSchema);
exports.Comment = mongoose.model('Comment', CommentSchema);
exports.Category = mongoose.model('Category', CategorySchema);
