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
  'liked_posts': [{ type: Schema.Types.ObjectId, ref: 'Post' }]
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
  'category': String,
  'short': String
});

CategorySchema.methods.getShortName = function() {

}


/**
 * Models
 */
exports.User = mongoose.model('User', UserSchema);
exports.Post = mongoose.model('Post', PostSchema);
exports.Comment = mongoose.model('Comment', CommentSchema);
exports.Category = mongoose.model('Category', CategorySchema);
