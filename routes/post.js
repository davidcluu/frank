/*
 * GET Post Page
 */

// Render the page
exports.view = function(req, res) {
  res.render('post', sample_post);
};

// Post to render
var sample_post = {
  'title' : 'Sample Title',
  // Associated picture goes here
  'upvotes' : 69,
  'downvotes' : 96,
  'comments': [
    {
      'text' : 'That\'s so ... 2016',
      'upvotes' : 1,
      'downvotes' : 2
    },
    {
      'text' : 'What a cute white square!',
      'upvotes' : 3,
      'downvotes' : 4
    },
    {
      'text' : 'I r8 8/8 m8.',
      'upvotes' : 5,
      'downvotes' : 6
    }
  ]
}
