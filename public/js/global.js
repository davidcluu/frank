// jQuery ready ()
$(function(){
  $("#category-nav-toggle").click( doExpandCategoryContainer );
  $("#search-nav-toggle").click( doExpandSearchContainer );
  $("#search-button").click( doSearch );
  $("#search-button-b").click( doSearchB );

  colorNavigation();

  $(window).on('scroll', onScroll);
  onScroll();

  $('.fadein').slice(1).each( function() {
    $(this).velocity({
      translateY: 70
    }, 0);
  })
});


// Expand Category container
var categoryExpanded = false;
function doExpandCategoryContainer() {
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
function doExpandSearchContainer() {
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


function doSearch(e) {
  e.preventDefault();

  var searchVal = $('#search-field').val().replace(/\s+/g, ' ').toLowerCase();

  // Redirect
  $(location).attr('href', '/pages/' + searchVal);
}

function doSearchB(e) {
  e.preventDefault();

  var searchVal = $('#search-field').val().replace(/\s+/g, ' ').toLowerCase();

  // Redirect
  $(location).attr('href', '/pages/' + searchVal);
}


function colorNavigation() {
  var url = window.location.href;
  if (url.indexOf('search') > -1) {
    $('#navbar .glyphicon-search').css('color', 'purple');
  }
  else if (url.indexOf('submit') > -1) {
    $('#navbar .glyphicon-plus').css('color', 'purple');
  }
  else if (url.indexOf('profile') > -1) {
    $('#navbar .glyphicon-bell').css('color', 'purple');
  }
  else {
    $('#navbar .glyphicon-home').css('color', 'purple');
  }
}


function onScroll() {
  var docViewBottom = $(window).scrollTop() + $(window).height();

  $('.post-box').each(function() {
    fadeInElement($(this), $(this), docViewBottom);
  });

  function fadeInElement(eTrig, e, docbot) {
    if (e.hasClass('fadein')) {
      var offset = eTrig.offset().top;
      if (docViewBottom > offset)
        e.velocity({
          opacity: 1,
          translateY: 0
        }, {
          duration: 350,
          easing: 'linear'
        });
    }
  }
}
