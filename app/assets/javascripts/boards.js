var ready = function() {

  /* Icon definition */
  var stickieOptionsIcon = "glyphicon-cog";

  function addLayoutBehaviour(){
    $( ".column" ).sortable({
      connectWith: ".column",
      handle: ".panel-heading",
      cancel: ".portlet-toggle, .editable-input",
      placeholder: "well portlet-placeholder",
      opacity: 0.5,
      revert: true,
      update: function (event, ui) {

        var columnId = ui.item.parents(".column").attr("column-id");
        var laneId = ui.item.parents("tr").attr("lane-id");
        var stickyId = ui.item.attr("sticky-id");
        $.ajax({
          url:    "/stickies/"+stickyId,
          type:   "PUT",
          data:   {sticky: {column_id: columnId, lane_id: laneId}},
          success: function(response){
          }
        });
      }
    });

    
    $( ".panel" )
    .find( ".panel-button" ).each(function() {

      var stickyId = $(this).closest('.panel').attr('sticky-id');

      var stickyLink = $(this).text();

      var optionsDiv = $('<div class="btn-group btn-group-xs pull-right"></div>');
      var optionsButton = $('<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="glyphicon '+stickieOptionsIcon+'"></span> <span class="caret"></span></button>');
      var optionsDropdownMenu = $('<ul class="dropdown-menu" role="menu"></ul>');
      var optionsDropdownColorSubmenu = $('<li class="dropdown-submenu"></li>');
      var chooseColorOption = $('<a tabindex="-1"><span class="glyphicon glyphicon-chevron-left" style="opacity:0.3;"></span> '+I18n.select_color+'</a>');
      var colorChooser = $('<ul class="dropdown-menu dropdown-color"></ul>');
      var divider = $('<li role="presentation" class="divider"></li>');
      var actionsHeader = $('<li role="presentation" class="dropdown-header">'+I18n.actions+'</li>');
      var li = $('<li></li>');
      var actionButtonGroup = $('<div class="btn-group btn-group-xs action-group"></div>');
      var deleteOption = $('<a class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-trash"></span> '+I18n.delete_option+'</a>');
      var linkOption = $('<a href="'+stickyLink+ '" class="btn btn-primary btn-xs sticky-link"><span class="glyphicon glyphicon-link"></span> '+I18n.link_option+'</a>');
      var editLinkOption = $('<a href="#" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#linkEditModal"><span class="glyphicon glyphicon-pencil"></span></a>');

      optionsButton.click(function() {
        $(this).next('.dropdown-menu').slideToggle(150);
      });

      editLinkOption.click(function () {
        $('#link_input').val(stickyLink);
        $('#hiddenStickyId').val(stickyId);
      });

      deleteOption.click(function(){
        var button = $(this);
        var panel = button.closest(".panel");
        var stickyId = panel.attr('sticky-id');
        $.ajax({
          dataType: "json",
          type: 'delete',
          url: '/stickies/' + stickyId,
          success: function (data) {
            panel.addClass('hinge');
            //panel.addClass('bounceOut');
            setTimeout(function(){
              panel.remove();
            }, 1000);
          }
        });
      });

      var redOption = $("<li color-class='panel-danger'><a tabindex='-1'><div class='color-circle' style='background-color:#f2dede;'></div>&nbsp</a></li>");
      var greenOption = $("<li color-class='panel-success'><a tabindex='-1'><div class='color-circle' style='background-color:#dff0d8;' ></div>&nbsp</a></li>");
      var defaultOption = $("<li color-class='panel-default'><a tabindex='-1'><div class='color-circle' style='background-color:whitesmoke;' ></div>&nbsp</a></li>");
      var yellowOption = $("<li color-class='panel-warning'><a tabindex='-1'><div class='color-circle' style='background-color:#fcf8e3;' ></div>&nbsp</a></li>");
      var blueOption = $("<li color-class='panel-info'><a tabindex='-1'><div class='color-circle' style='background-color:#d9edf7;' ></div>&nbsp</a></li>");

      colorChooser.append(defaultOption);
      colorChooser.append(redOption);
      colorChooser.append(greenOption);
      colorChooser.append(yellowOption);
      colorChooser.append(blueOption);

      actionButtonGroup.append(deleteOption);
      actionButtonGroup.append(linkOption);
      actionButtonGroup.append(editLinkOption);

      li.append(actionButtonGroup);


      optionsDropdownColorSubmenu.append(chooseColorOption);
      optionsDropdownColorSubmenu.append(colorChooser);

      optionsDropdownMenu.append(optionsDropdownColorSubmenu);
      optionsDropdownMenu.append(divider);
      optionsDropdownMenu.append(actionsHeader);
      optionsDropdownMenu.append(li);
      

      optionsDiv.append(optionsButton);
      optionsDiv.append(optionsDropdownMenu);
      $(this).html(optionsDiv);
    });
    

    $( ".panel-toggle" ).click(function() {
      $(this).closest( ".panel" ).find( ".panel-body" ).toggle();
    });

    $('.panel').hover(
      function(){
        if($( window ).width()>=768)
          $(this).find('.panel-button').fadeIn(200);
      },
      function(){
        if($( window ).width()>=768)
          $(this).find('.panel-button').fadeOut(200);
      }
    );

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

    $('[data-toggle="tooltip"]').tooltip({
      container: 'body'
    });

  };

  function addMobileBehaviour(){

    $('.mobile-modal').click(function () {
      var data_id = '';
      if (typeof $(this).data('id') !== 'undefined') {
        data_id = $(this).data('id');
      }
      $('[modal-color-class]').attr('sticky-id',data_id);
      $('.modal-delete-stickie').attr('sticky-id',data_id);
    });

    $('[modal-color-class]').click(function() {
      var stickyId = $(this).attr('sticky-id');
      var panel = $('.panel[sticky-id="'+stickyId+'"]');
      var colorClass = $(this).attr('modal-color-class');
      $.ajax({
        dataType: "json",
        type: "PUT",
        url: '/stickies/'+stickyId,
        data: {sticky: {color: colorClass}},
        success: function () {
          $('#stickieOptionModal').modal('hide');
          panel.removeClass();
          panel.addClass('panel');
          panel.addClass(colorClass);
        }
      });
    });

    $('.modal-delete-stickie').click(function(){
      var stickyId = $(this).attr('sticky-id');
      var panel = $('.panel[sticky-id="'+stickyId+'"]');
      $.ajax({
        dataType: "json",
        type: 'delete',
        url: '/stickies/' + stickyId,
        success: function (data) {
          panel.fadeOut('slow', function(){
            $('#stickieOptionModal').modal('hide');
            panel.remove();
          });
        }
      });
    });
  };

  function addDeleteBehaviour(){

    $(".delete-column").click(function(){

      var button = $(this);
      var columnId = button.closest(".h4").attr('column-id');
      $.ajax({
        dataType: "json",
        type:   'delete',
        url:    '/columns/'+columnId,
        success:function( data ){
          var columnIndex = button.closest("th").prevAll("th").length;
          button.parents("table").find("tr").each(function () {
            $(this).find("td:eq("+columnIndex+"), th:eq("+columnIndex+")").fadeOut('slow', function() {
              $(this).remove();
            });
          });
        }
      });
    });

    $(".delete-lane").click(function(){
      var lane = $(this).closest('tr');
      var laneId = lane.attr('lane-id');
      $.ajax({
        dataType: "json",
        type: 'delete',
        url: '/rows/'+laneId,
        success: function (data) {
          lane.addClass('animated bounceOutLeft');
          setTimeout(function() {
            lane.remove();
          }, 500);
        }
      });
    });
  };

  $('.add-lane').click(function () {
    var boardId = $(this).attr("board-id");
    $.ajax({
      url:    "/rows",
      type:   "POST",
      data:   {row: {board_id: boardId}},
      success: function (response) {
        var newRow = $('<tr lane-id="'+response.id+'"></tr>');
        var editable = $('<a href="#" data-xeditable="true" data-pk="'+response.id+'" data-model="row" data-name="name" data-url="/rows/'+response.id+'" data-title="Enter name" style="margin-left:5px;"></a>');
        var title = $('<td class="lane-column"></td>');

        editable.append(response.name);
        title.append(editable);
        var addButton = $('<button class="btn btn-xs btn-default add-sticky" add-sticky="true" data-toggle="tooltip" data-placement="bottom" title="'+I18n.add_stickie_description+'"><span class="glyphicon glyphicon-plus"></span> </button>');
        var deleteButton = $('<button class="btn btn-xs btn-danger delete-lane" data-toggle="tooltip" data-placement="bottom" title="'+I18n.delete_lane_description+'"><span class="glyphicon glyphicon-trash"></span></button>');
        var deleteToggleButton = $(' <button class="btn btn-xs btn-link delete-toggle"><span class="glyphicon glyphicon-trash"></span></button>');
        var number_of_columns = $('.title_field').find('tr').first().find('th').length

        deleteToggleButton.click(function() {
          var laneColumn = $(this).closest('.lane-column');
          if(laneColumn.find('.delete-lane').is(':visible')){
            laneColumn.find('.delete-lane').fadeOut(500);
            laneColumn.find('a').animate({'marginLeft' : "5px"}); 
          }
          else {
            laneColumn.find('.delete-lane').fadeIn(500);
            laneColumn.find('a').animate({'marginLeft' : "35px"});
          }         
        });

        /* Button append */
        title.prepend(deleteButton);
        title.append(deleteToggleButton);
        title.append(addButton);

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
        addDeleteBehaviour();

        addStickie(addButton);
      }
    });

  });

  var viewState = true;
  $('.toggle-collapse').click(function() {
    $('.panel').each(function () {
      if(viewState){
        $(this).find( ".panel-body" ).slideUp();
      }
      else {
        $(this).find( ".panel-body" ).slideDown();
      }
    });
    viewState = !viewState;
  });

  $('.toggle-edit').click(function () {
    $("[data-xeditable=true]").editable('toggleDisabled');
  });

  /* initial panel's buttons */
  function addStickie(element){
    element.click(function(){

      var currentLane = $(this).closest('tr');
      var laneId = currentLane.attr('lane-id');
      var starterColumnId = currentLane.find("td:eq(1)").attr("column-id");

      $.ajax({
        url:    "/stickies",
        type:   "POST",
        data:   {sticky: {column_id: starterColumnId, row_id: laneId}},
        success: function(response){
          var panel = $('<div class="panel animated bounceInLeft panel-default" sticky-id="'+response.id+'"></div>');
          var editableHeader = $('<a href="#" data-xeditable="true" data-pk="'+response.id+'" data-model="sticky" data-name="name" data-url="/stickies/'+response.id+'" data-title="Enter name">'+response.name+'</a>');
          var panelButton = $('<div class="panel-button">'+response.link+'</div>');
          var panelHeader = $('<div class="panel-heading"></div>');
          var panelMobileButton = $('<i class="panel-button-mobile"><a data-toggle="modal" data-target="#stickieOptionModal" data-id="'+response.id+'" class="mobile-modal"><span class="glyphicon glyphicon-cog pull-right"></span></a></i>');
          panelHeader.prepend(editableHeader);
          panelHeader.append(panelMobileButton);
          var editableBody = $('<a href="#" data-xeditable="true" data-pk="'+response.id+'" data-model="sticky" data-name="text" data-url="/stickies/'+response.id+'" data-title="Enter text" data-type="textarea" data-showbuttons="bottom" data-anim="500" >'+response.text+'</a>');
          var panelBody = $('<div class="panel-body"></div>');
          panelBody.append(editableBody);

          panel.append(panelButton);
          panel.append(panelHeader);
          panel.append(panelBody);

          currentLane.find("td:eq(1)").prepend(panel);

          addLayoutBehaviour();
          addMobileBehaviour();

          setTimeout(function(){
            //panel.removeClass('tada');
            panel.removeClass('bounceInLeft');
          },1000);

        }
      });
    });
  };

  function addSideColumnBehaviour(element){
    element.click(function(){
      var button = $(this);
      var columnTitle = "Column title";
      var boardId = $(this).attr("board-id");
      var columnIndex = button.closest("th").prevAll("th").length;
      var side = $(this).attr("side");
      if(side=='right')
        order=columnIndex + 1;
      else
        order=columnIndex;
      $.ajax({
        url:    "/columns/insert_between_columns",
        type:   "POST",
        data:   {column: {name: columnTitle, board_id: boardId, column_order: order}, side: side},
        success: function(response){
          var columnId = response.id;
          var insertIndex = columnIndex;
          if (side === 'left')
            insertIndex = columnIndex-1;
          $('.column_field').find('tr').each(function () {
            var newColumn = $('<td class="column"><div class="column-content"></div></td>');
            newColumn.hide();
            $(this).find('td').eq(insertIndex).after(newColumn)
            newColumn.fadeIn('slow');
          });


          $('.title_field').find('tr').each(function () {
            var buttonGroup = $('<div class="btn-group pull-right btn-group-xs"></div>');
            var button = $('<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-wrench"></span> <span class="caret"></span></button>');
            var dropdownMenu = $('<ul class="dropdown-menu" role="menu"></ul>');
            var addColumnHeader = $('<li role="presentation" class="dropdown-header">Add Column ...</li>');
            var actionsHeader = $('<li role="presentation" class="dropdown-header">Actions</li>');
            var divider = $('<li role="presentation" class="divider"></li>');
            var addSideColumnLeftOption = $('<li><a href="#" class="add-side-column" board-id="<%= @board.id %>" side="left"><span class="glyphicon glyphicon-circle-arrow-left"></span> To the left</a></li>');
            var addSideColumnRightOption = $('<li><a href="#" class="add-side-column" board-id="<%= @board.id %>" side="right"><span class="glyphicon glyphicon-circle-arrow-right"></span> To the right</a></li>');
            var deleteOption = $('<li><a href="#" class="delete-column" board-id="<%= @board.id %>" side="right"><span class="glyphicon glyphicon-remove-sign"></span> Delete Column</a></li>');

            addSideColumnBehaviour(addSideColumnLeftOption);
            addSideColumnBehaviour(addSideColumnRightOption);

            var newTitle = $('<div class="h4" column-id="'+columnId+'"></div>');
            var titleContent = $('<a href="#" data-xeditable="true" data-pk="'+columnId+'" data-model="column" data-name="name" data-url="/columns/'+columnId+'" data-title="Enter name">'+columnTitle+'</a>');
            
            dropdownMenu.append(addColumnHeader);
            dropdownMenu.append(addSideColumnLeftOption);
            dropdownMenu.append(addSideColumnRightOption);
            dropdownMenu.append(divider);
            dropdownMenu.append(actionsHeader);
            dropdownMenu.append(deleteOption);

            buttonGroup.append(button);
            buttonGroup.append(dropdownMenu);

            newTitle.append(titleContent);
            newTitle.append(buttonGroup);
        
            newTitle.hide();
            $(this).find('th').eq(insertIndex).after($('<th class="column-title"></th>').append(newTitle));
            newTitle.fadeIn('slow');
          });

          addDeleteBehaviour();
          addLayoutBehaviour();
        }
      });
    });
  };

  $("[add-sticky=true]").each(function () {
    return addStickie($(this));
  });

  addSideColumnBehaviour($('.add-side-column'));


  $("a#send").click(function(){ 
    var linkInput = $("#link_input").val();
    var stickyId = $("#hiddenStickyId").val();
    $.ajax({
      url: '/stickies/'+stickyId,
      type: 'PUT',
      data: { sticky: {link: linkInput} },
      success: function () {
        $('[sticky-id='+stickyId+']').find('.sticky-link').attr('href',linkInput);
        $('#linkEditModal').modal('hide');
      }
    });
  });

  $('.dropdown-toggle').click(function() {
      $(this).next('.dropdown-menu').slideToggle(150);
  });

  $('.delete-toggle').click(function() {
    var laneColumn = $(this).closest('.lane-column');
    if(laneColumn.find('.delete-lane').is(':visible')){
      laneColumn.find('.delete-lane').fadeOut(500);
      laneColumn.find('a').animate({'marginLeft' : "5px"}); 
    }
    else {
      laneColumn.find('.delete-lane').fadeIn(500);
      laneColumn.find('a').animate({'marginLeft' : "35px"});
    }         
  });

  addLayoutBehaviour();
  addDeleteBehaviour();
  addMobileBehaviour();

};

$(document).ready(ready);
$(document).on('page:load', ready);
