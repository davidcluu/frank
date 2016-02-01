/*
 * GET Home Page
 */

exports.view = function(req, res) {
  res.render('index', {
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
  });
};