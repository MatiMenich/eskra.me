$(function() {

  function addBehaviour(){
    $( ".column-content" ).sortable({
      connectWith: ".column-content",
      handle: ".panel-heading",
      cancel: ".portlet-toggle",
      placeholder: "well portlet-placeholder"
    });

    $( ".panel" )
    .find( ".panel-button" )
    .html( "<button class='btn btn-xs btn-link pull-right panel-toggle'><span class='glyphicon glyphicon-chevron-down'></span></button>");

    $( ".panel-toggle" ).click(function() {
      var icon = $( this ).find('span');
      icon.toggleClass( "glyphicon-chevron-down glyphicon-chevron-up" );
      icon.closest( ".panel" ).find( ".panel-body" ).toggle();
    });
    
  };


  addBehaviour();

  $('#addcolumn').click(function () {
    var newColumn = $('<td class="column"><div class="column-content"></div></td>');
    var newTitle = $('<th><div class="column-title h4">Título X <button class="btn btn-xs"><span class="glyphicon glyphicon-plus"></span></button></div></th>');
    $('.column_field').find('tr').append(newColumn);
    $('.title_field').find('tr').append(newTitle);


    addBehaviour();
  });
});