$(document).ready(function(){
  //this all code is copied for file input in nodewebkit
  $('ul.tabs').tabs();
  function chooseFile(name) {
    var chooser = $(name);
    chooser.unbind('change');
    chooser.change(function(evt) {
            console.log($(this).val());
            //$(this).val().trigger('input');

    });
    //chooser.trigger('click');  
  }
  $('.file').on('click',function(){
    console.log($(this).attr('id'));
    chooseFile($(this).attr('id'));
  });
});