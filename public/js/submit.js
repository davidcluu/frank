// jQuery ready ()
$(function(){
  $("#imageInput").change(function(){
    updatePreviewImage(this);
  });
});

function updatePreviewImage(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    
    reader.onload = function (e) {
      $('#previewImage').attr('src', e.target.result);
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}
