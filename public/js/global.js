// jQuery ready ()
$(function(){
  $("#category-nav-toggle").click( doExpandCategoryContainer );
  $("#search-nav-toggle").click( doExpandSearchContainer );
});


// Expand Category container
var categoryExpanded = false;
function doExpandCategoryContainer () {
  var inner = $("#category-nav-inner");
  var outer = $("#category-nav-outer");

  if (categoryExpanded) {
    outer.animate( {height: 0} );
  }
  else {
    if (searchExpanded) {
      var searchInner = $("#search-nav-inner");
      var searchOuter = $("#search-nav-outer");
      searchOuter.animate( {height: 0} );
      searchExpanded = !searchExpanded;
    }
    outer.animate( {height: inner.innerHeight() + "px"} );
  }
  categoryExpanded = !categoryExpanded;
}

// Expand Search container
var searchExpanded = false;
function doExpandSearchContainer () {
  var inner = $("#search-nav-inner");
  var outer = $("#search-nav-outer");

  if (searchExpanded) {
    outer.animate( {height: 0} );
  }
  else {
    if (categoryExpanded) {
      var categoryInner = $("#category-nav-inner");
      var categoryOuter = $("#category-nav-outer");
      categoryOuter.animate( {height: 0} );
      categoryExpanded = !categoryExpanded;
    }
    outer.animate( {height: inner.innerHeight() + "px"} );
  }
  searchExpanded = !searchExpanded;
}
