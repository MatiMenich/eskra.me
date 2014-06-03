var ready = function() {

  var storyNumber = 1;


  function addLayoutBehaviour(){
    $( ".column" ).sortable({
      connectWith: ".column",
      handle: ".panel-heading",
      cancel: ".portlet-toggle",
      placeholder: "well portlet-placeholder",
      opacity: 0.5,
      revert: true,
      update: function (event, ui) {

          var columnId = ui.item.parents(".column").attr("column-id");
          var storyId = ui.item.parents("tr").attr("story-id");
          var stickyId = ui.item.attr("sticky-id");
          //console.log('column-id:'+columnId);
          //console.log('story-id:'+storyId);
          //console.log('sticky-id:'+stickyId);
          $.ajax({
            url:    "/stickies/"+stickyId,
            type:   "PUT",
            data:   {sticky: {column_id: columnId, story_id: storyId}},
            success: function(response){ 
            }
          });
        }
    });

    $( ".panel" )
    .find( ".panel-button" )
    .html( "<div class='btn-group btn-xs'></div>");

    var toggleButton = $("<button class='btn btn-xs btn-link pull-right panel-toggle'><span class='glyphicon glyphicon-chevron-down'></span></button>");

    var dropdownDiv = $("<div class='icon-btn pull-right dropdown'></div>");
    var dropdownButton = $("<button class='btn btn-link btn-xs dropdown-toggle' role='button' href='#' data-toggle='dropdown'><span class='glyphicon glyphicon-tint'></span></button>");
    var dropdownMenu = $("<ul class='dropdown-menu pull-right' role='menu'></ul>");
    var redOption = $("<li color-class='panel-danger'><a tabindex='-1'><div class='color-circle' style='background-color:#f2dede;'></div>&nbsp</a></li>");
    var greenOption = $("<li color-class='panel-success'><a tabindex='-1'><div class='color-circle' style='background-color:#dff0d8;' ></div>&nbsp</a></li>");
    var defaultOption = $("<li color-class='panel-default'><a tabindex='-1'><div class='color-circle' style='background-color:whitesmoke;' ></div>&nbsp</a></li>");
    var yellowOption = $("<li color-class='panel-warning'><a tabindex='-1'><div class='color-circle' style='background-color:#fcf8e3;' ></div>&nbsp</a></li>"); 
    var blueOption = $("<li color-class='panel-info'><a tabindex='-1'><div class='color-circle' style='background-color:#d9edf7;' ></div>&nbsp</a></li>");

    dropdownMenu.append(defaultOption);
    dropdownMenu.append(redOption);
    dropdownMenu.append(greenOption);
    dropdownMenu.append(yellowOption);
    dropdownMenu.append(blueOption);

    dropdownDiv.append(dropdownButton);
    dropdownDiv.append(dropdownMenu);

    $( ".panel" )
    .find( ".panel-button" )
    .append(toggleButton).append(dropdownDiv);


    $( ".panel-toggle" ).click(function() {
      var icon = $( this ).find('span');
      icon.toggleClass( "glyphicon-chevron-down glyphicon-chevron-up" );
      icon.closest( ".panel" ).find( ".panel-body" ).toggle();
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

    $('[color-class]').click(function() {
      var panel = $(this).closest('.panel');
      var colorClass = $(this).attr('color-class');
      $.ajax({
        dataType: "json",
        type: "PUT",
        url: '/stickies/'+panel.attr('sticky-id'),
        data: {sticky: {color: colorClass}},
        success: function () {
          panel.removeClass();
          panel.addClass('panel');
          panel.addClass(colorClass);
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
      var storyId = story.attr('story-id');
      $.ajax({
        dataType: "json",
        type: 'delete',
        url: '/rows/'+storyId,
        success: function (data) {
          story.fadeOut('slow', function(){
            $(this).remove();
          });
        }
      });
    });
  };

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
    var boardId = $(this).attr("board-id");
    $.ajax({
      url:    "/rows",
      type:   "POST",
      data:   {row: {board_id: boardId}},
      success: function (response) {
        var newRow = $('<tr story-id="'+response.id+'"></tr>');
        var editable = $('<a href="#" data-xeditable="true" data-pk="'+response.id+'" data-model="row" data-name="name" data-url="/rows/'+response.id+'" data-title="Enter name"></a>');
        var title = $('<td></td>');
        editable.append(response.name);
        title.append(editable);
        var buttonGroup = $('<div class="btn-group"></div>');
        var deleteButton = $('<button class="btn btn-xs btn-warning delete-story"><span class="glyphicon glyphicon-trash"> </span>');
        var addButton = $('</button><button class="btn btn-xs btn-primary"><span class="glyphicon glyphicon-plus"> </span></button>');
        var number_of_columns = $('.title_field').find('tr').first().find('th').length
        
        /* Button append */
        buttonGroup.append(deleteButton);
        buttonGroup.append(addButton);

        title.append(buttonGroup);

        var columnIds = [];
        $('.column_field').find('tr').first().find('.column').each(function () { columnIds.push( $(this).attr('column-id')) })

        newRow.append(title);
        for(var i = 0 ; i < number_of_columns-1 ; i++){
          var newColumn = $('<td class="column" column-id="'+columnIds[i]+'"></td>');
          newRow.append(newColumn)
        }

        newRow.hide();
        $('.column_field').append(newRow);
        newRow.fadeIn('slow');
        addLayoutBehaviour();
        addButtonBehaviour();

        addButton.click(function(){
          
          var currentStory = $(this).closest('tr');
          var storyId = currentStory.attr('story-id');
          var starterColumnId = $(this).closest('tr').find("td:eq(1)").attr("column-id");

          $.ajax({
            url:    "/stickies",
            type:   "POST",
            data:   {sticky: {column_id: starterColumnId, row_id: storyId}},
            success: function(response){ 
              var panel = $('<div class="panel panel-default" sticky-id="'+response.id+'"></div>');
              var editableHeader = $('<a href="#" data-xeditable="true" data-pk="'+response.id+'" data-model="sticky" data-name="name" data-url="/stickies/'+response.id+'" data-title="Enter name">'+response.name+'</a>')
              var panelHeader = $('<div class="panel-heading"><i class="panel-button"></i></div>');
              panelHeader.prepend(editableHeader);
              var editableBody = $('<a href="#" data-xeditable="true" data-pk="'+response.id+'" data-model="sticky" data-name="text" data-url="/stickies/'+response.id+'" data-title="Enter text" data-type="textarea" data-showbuttons="bottom" data-anim="500">'+response.text+'</a>');
              var panelBody = $('<div class="panel-body"></div>');
              panelBody.append(editableBody);

              panel.append(panelHeader);
              panel.append(panelBody);

              currentStory.find("td:eq(1)").append(panel);

              addLayoutBehaviour();
            }
          });

          addLayoutBehaviour();
        });
      }

    });

    
  });

  $('#toggle_collapse').click(function() {
    $('[class*="glyphicon-chevron-"]').each(function () {
      $(this).toggleClass( "glyphicon-chevron-down glyphicon-chevron-up" );
      $(this).closest( ".panel" ).find( ".panel-body" ).toggle();
    });
  });

  $('#toggle_edit').click(function () {
    $("[data-xeditable=true]").editable('toggleDisabled');
  });

  /* initial panel's buttons */
  $("[add-sticky=true]").each(function () { 
    return $(this).click(function(){

      var currentStory = $(this).closest('tr');

      var starterColumnId = currentStory.find("td:eq(1)").attr("column-id");
      var storyId = currentStory.attr('story-id');

      $.ajax({
        url:    "/stickies",
        type:   "POST",
        data:   {sticky: {column_id: starterColumnId, row_id: storyId}},
        success: function(response){ 
          var panel = $('<div class="panel panel-default" sticky-id="'+response.id+'"></div>');
          var editableHeader = $('<a href="#" data-xeditable="true" data-pk="'+response.id+'" data-model="sticky" data-name="name" data-url="/stickies/'+response.id+'" data-title="Enter name">'+response.name+'</a>')
          var panelHeader = $('<div class="panel-heading"><i class="panel-button"></i></div>');
          panelHeader.prepend(editableHeader);
          var editableBody = $('<a href="#" data-xeditable="true" data-pk="'+response.id+'" data-model="sticky" data-name="text" data-url="/stickies/'+response.id+'" data-title="Enter text" data-type="textarea" data-showbuttons="bottom" data-anim="500" >'+response.text+'</a>');
          var panelBody = $('<div class="panel-body"></div>');
          panelBody.append(editableBody);

          panel.append(panelHeader);
          panel.append(panelBody);

          currentStory.find("td:eq(1)").append(panel);

          addLayoutBehaviour();
        }
      });
    });
  });

};

$(document).ready(ready);
$(document).on('page:load', ready);

