$(function() {

  function addBehaviour(){
    $( ".column" ).sortable({
      connectWith: ".column",
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

  $('#add_column').click(function () {

    $('.column_field').find('tr').each(function () {
      var newColumn = $('<td class="column"><div class="column-content"></div></td>');
      newColumn.hide();
      $(this).append(newColumn)
      newColumn.fadeIn('slow');
    });
    $('.title_field').find('tr').each(function () {
      var newTitle = $('<th><div class="column-title h4">Title X <button class="btn btn-xs btn-danger delete-column pull-right"><span class="glyphicon glyphicon-remove"></span></button></div></th>');
      newTitle.hide();
      $(this).append(newTitle);
      newTitle.fadeIn('slow');
    });

    addBehaviour();

    $(".delete-column").click(function(){
      var columnIndex = $(this).closest("th").prevAll("th").length;
      $(this).parents("table").find("tr").each(function () {
        $(this).find("td:eq("+columnIndex+"), th:eq("+columnIndex+")").fadeOut('slow', function() {
          $(this).remove();
        });
      });
    });
    
  });

  $(".delete-column").click(function(){
    var columnIndex = $(this).closest("th").prevAll("th").length;
    $(this).parents("table").find("tr").each(function () {
      $(this).find("td:eq("+columnIndex+"), th:eq("+columnIndex+")").fadeOut('slow', function() {
        $(this).remove();
      });
    });
  });

  $('#add_story').click(function () {
    var newRow = $('<tr></tr>');
    var title = $('<td>Story X</td>');
    var number_of_columns = $('.column_field').find('tr').first().find('td').length
    newRow.append(title);

    for(var i = 0 ; i < number_of_columns-1 ; i++){
      var newColumn = $('<td class="column"><div class="column-content"></div></td>');
      newRow.append(newColumn)
    }

    newRow.hide();
    $('.column_field').append(newRow);
    newRow.fadeIn('slow');
    addBehaviour();
  });

});