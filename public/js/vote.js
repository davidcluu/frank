// jQuery ready ()
$(function(){
  $(".arrow.up").click( doUpvote );
  $(".arrow.down").click( doDownvote );
});


/* Upvote/Downvote things
 */

// Helper functions for Upvote/Downvote
function doScoreUpdate (parent, which, amt) {
  var newScore = parseInt(parent.find(".score." + which + "vote").text(), 10) + amt;
  parent.find(".score." + which + "vote").text(newScore);
}

// Upvote
function doUpvote (e) {
  // Get the parent score object
  var score = $(this).closest(".score");

  if (score.hasClass("unvoted")) {
    doScoreUpdate(score, "up", 1);

    score.removeClass("unvoted");
    score.addClass("upvoted");
  }
  else if (score.hasClass("downvoted")) {
    doScoreUpdate(score, "down", -1);
    doScoreUpdate(score, "up", 1);

    score.removeClass("downvoted");
    score.addClass("upvoted");
  }
  else {
    doScoreUpdate(score, "up", -1);

    score.removeClass("upvoted");
    score.addClass("unvoted");
  }
}

// Downvote
function doDownvote (e) {
  // Get the parent score object
  var score = $(this).closest(".score");

  if (score.hasClass("unvoted")) {
    doScoreUpdate(score, "down", 1);

    score.removeClass("unvoted");
    score.addClass("downvoted");
  }
  else if (score.hasClass("upvoted")) {
    doScoreUpdate(score, "up", -1);
    doScoreUpdate(score, "down", 1);

    score.removeClass("upvoted");
    score.addClass("downvoted");
  }
  else {
    doScoreUpdate(score, "down", -1);

    score.removeClass("downvoted");
    score.addClass("unvoted");
  }
}