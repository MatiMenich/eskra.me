var ready = function() {

  var storyNumber = 1;

/*
  function recoverStickiesData(){

    var dani;
    $.ajax({
      dataType: "json",
      type:   'GET',
      url:    '/stickies/1',
      success:function(data){
              // alert( JSON.stringify(data) );
              //alert( data.name );

              dani = data;

              var title = data.name;
              var body  = data.text;
              var panel = $('<div class="panel panel-default"></div>');
              var panelHeader = $('<div class="panel-heading">'+title+'<i class="panel-button"></i></div>');
              var panelBody = $('<div class="panel-body">'+body+'</div>');

              panel.append(panelHeader);
              panel.append(panelBody);

              $('.add-panel-' + 1).closest('tr').find("td:eq(1)").append(panel);


            }
          });

  };
*/

  function addLayoutBehaviour(){
    $( ".column" ).sortable({
      connectWith: ".column",
      handle: ".panel-heading",
      cancel: ".portlet-toggle",
      placeholder: "well portlet-placeholder"
    });

    $( ".panel" )
    .find( ".panel-button" )
    .html( "<button class='btn btn-xs btn-link pull-right panel-toggle'><span class='glyphicon glyphicon-chevron-down'></span></button><button class='btn btn-xs btn-link panel-edit pull-right'><span class='glyphicon glyphicon-edit'></span></button>");

    $( ".panel-toggle" ).click(function() {
      var icon = $( this ).find('span');
      icon.toggleClass( "glyphicon-chevron-down glyphicon-chevron-up" );
      icon.closest( ".panel" ).find( ".panel-body" ).toggle();
    });

    $(".panel-edit").click(function() {
      var panel = $( this ).closest('.panel');
      panel.toggleClass( "panel-default panel-success" );
    });

    $("[data-xeditable=true]").each(function() {
    return $(this).editable({
      mode: 'inline',
      ajaxOptions: {
        type: "PUT",
        dataType: "json"
      },
      params: function(params) {
        var railsParams;
        railsParams = {};
        railsParams[$(this).data("model")] = {};
        railsParams[$(this).data("model")][params.name] = params.value;
        return railsParams;
      }
    });
  });
  };

  function addButtonBehaviour(){

    $(".delete-column").click(function(){

      var button = $(this);
      var columnId = button.parent().attr('board-id');

      $.ajax({
        dataType: "json",
        type:   'delete',
        url:    '/columns/'+columnId,
        success:function(data){
          var columnIndex = button.closest("th").prevAll("th").length;
          button.parents("table").find("tr").each(function () {
            $(this).find("td:eq("+columnIndex+"), th:eq("+columnIndex+")").fadeOut('slow', function() {
              $(this).remove();
            });
          });
        }
      });
      
    });

    $(".delete-story").click(function(){
      storyNumber--;
      var story = $(this).closest('tr');
      story.fadeOut('slow', function(){
        $(this).remove();
      });
    });

  };

  //recoverStickiesData();
  addLayoutBehaviour();
  addButtonBehaviour();




  $('#add_column').click(function () {

    var columnTitle = "Column title";
    var boardId = $(this).attr("board-id");
    
    $.ajax({
      url:    "/columns",
      type:   "POST",
      data:   {column: {name: columnTitle, board_id: boardId, order: 4}},
      success: function(response){ 

          columnId = response.id;

          $('.column_field').find('tr').each(function () {
            var newColumn = $('<td class="column"><div class="column-content"></div></td>');
            newColumn.hide();
            $(this).append(newColumn)
            newColumn.fadeIn('slow');
          });

          $('.title_field').find('tr').each(function () {
            var removeButton = $('<button class="btn btn-xs btn-danger delete-column pull-right"><span class="glyphicon glyphicon-remove"></span></button>')
            var newTitle = $('<div class="column-title h4" id="'+columnId+'"></div>');
            var titleContent = $('<a href="#" data-xeditable="true" data-pk="'+columnId+'" data-model="column" data-name="name" data-url="/columns/'+columnId+'" data-title="Enter name">'+columnTitle+'</a>');
            newTitle.append(titleContent);
            newTitle.append(removeButton);
            newTitle.hide();
            $(this).append($('<th></th>').append(newTitle));
            newTitle.fadeIn('slow');
          });

          addLayoutBehaviour();
          addButtonBehaviour();
        }
    });

  });

  $('#add_story').click(function () {
    storyNumber++;

    var newRow = $('<tr></tr>');
    var title = $('<td>Story X </td>');
    var buttonGroup = $('<div class="btn-group"><button class="btn btn-xs btn-warning delete-story"><span class="glyphicon glyphicon-trash"> </span></button><button class="btn btn-xs btn-primary add-panel-'+storyNumber+'"><span class="glyphicon glyphicon-plus"> </span></button></div>');
    var number_of_columns = $('.title_field').find('tr').first().find('th').length
    title.append(buttonGroup);
    newRow.append(title);
    for(var i = 0 ; i < number_of_columns-1 ; i++){
      var newColumn = $('<td class="column"></td>');
      newRow.append(newColumn)
    }

    newRow.hide();
    $('.column_field').append(newRow);
    newRow.fadeIn('slow');
    addLayoutBehaviour();
    addButtonBehaviour();

    /* every other panel (not inicial) */
    $('.add-panel-' + storyNumber).click(function(){
      var title = 'Panel X';
      var body = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit';
      var panel = $('<div class="panel panel-default"></div>');
      var panelHeader = $('<div class="panel-heading">'+title+'<i class="panel-button"></i></div>');
      var panelBody = $('<div class="panel-body">'+body+'</div>');

      panel.append(panelHeader);
      panel.append(panelBody);

      $(this).closest('tr').find("td:eq(1)").append(panel);

      $.ajax({
        url:    "/stickies",
        type:   "POST",
        data:   {sticky: {name: 'dani', text: 'gatito pipipim', column_id: 1/*default value*/,  row_id: storyNumber}},
        success: function(resp){ 
          alert("!!");
        }
      });

      addLayoutBehaviour();
    });
  });

  /* initial panel */
  $('.add-panel-1').click(function(){
    var title = 'Panel X';
    var body = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit';
    var panel = $('<div class="panel panel-default"></div>');
    var panelHeader = $('<div class="panel-heading">'+title+'<i class="panel-button"></i></div>');
    var panelBody = $('<div class="panel-body">'+body+'</div>');

    panel.append(panelHeader);
    panel.append(panelBody);

    $(this).closest('tr').find("td:eq(1)").append(panel);

    addLayoutBehaviour();
  });

};

$(document).ready(ready);
$(document).on('page:load', ready);

