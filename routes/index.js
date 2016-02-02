/*
 * GET Home Page
 */

// Render the page
exports.view = function(req, res) {
  res.render('index', categories);
};


// Categories to render
var categories = {
  'categories': [
    {
      'category' : 'clothing'
    },
    {
      'category' : 'shoes'
    },
    {
      'category' : 'accessories'
    },
    {
      'category' : 'makeup'
    },
    {
      'category' : 'hairstyles'
    },
    {
      'category' : 'facialhair'
    },
  ]
}