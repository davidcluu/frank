// jQuery ready ()
$(function(){
  var width = $('#previewPlaceholder').css('width');
  $('#previewPlaceholder').css({
      'height': width
  });
  $('#previewPlaceholder span').css({
    'font-size': parseInt(width) / 3
  });

  $("#imageInput").change(function(){
    updatePreviewImage(this);
  });

  $('.previewObj').click( function() {
    $(".form-control-file").click();
  } );
});

function updatePreviewImage(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function (e) {
      $('#previewPlaceholder').css({
        'display': 'none'
      });
      $('#previewImageHolder').removeAttr( 'style' );
      $('#previewImage').attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}

$()
