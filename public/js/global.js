// jQuery ready ()
$(function(){
  $("#category-nav-toggle").click( doExpandHCIProjects );
});


// Expand HCI Projects container
var expanded = false;
function doExpandHCIProjects () {
  var inner = $("#category-nav-inner");
  var outer = $("#category-nav-outer");

  if (expanded) {
    outer.animate( {height: 0} );
  }
  else {
    outer.animate( {height: inner.innerHeight() + "px"} );
  }
  expanded = !expanded;
}