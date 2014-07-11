class ColumnsController < ApplicationController
  before_action :set_column, only: [:show, :edit, :update, :destroy]
  before_action :decrease_column_orders, only: :destroy
  before_action :move_remaining_stickies, only: :destroy
  after_action :increment_column_orders, only: :insert_between_columns

  # GET /columns
  def index
    @columns = Column.all
  end

  # GET /columns/1
  def show
  end

  # GET /columns/new
  def new
    @column = Column.new
  end

  # GET /columns/1/edit
  def edit
  end

  # POST /columns/insert_between_columns
  def insert_between_columns
    @column = Column.new(column_params)

    respond_to do |format|
      if @column.save
        format.json { render :show, status: :created, location: @column }
      else
        format.json { render json: @column.errors, status: :unprocessable_entity }
      end
    end

  end

  # POST /columns
  def create
    @column = Column.new(column_params)

    respond_to do |format|
      if @column.save
        format.json { render :show, status: :created, location: @column }
      else
        format.json { render json: @column.errors, status: :unprocessable_entity }
      end
    end

  end

  # PATCH/PUT /columns/1
  def update

    respond_to do |format|
      if @column.update(column_params)
        format.json { render :show, status: :ok, location: @column }
      else
        format.json { render json: @column.errors, status: :unprocessable_entity }
      end
    end

  end

  # DELETE /columns/1
  def destroy
    @column.destroy

    respond_to do |format|
      format.json { head :no_content }
    end

  end

  private

  def set_column
    @column = Column.find(params[:id])
  end

  def column_params
    params.require(:column).permit(:name, :column_order, :board_id)
  end

  def increment_column_orders
    Board.find(@column.board_id).columns.each do |column|
      if column.column_order >= @column.column_order
        if(column.id!=@column.id)
          column.increment(:column_order,1)
          column.save
        end
      end
    end
  end

  def decrease_column_orders
    Board.find(@column.board_id).columns.each do |column|
      if column.column_order >= @column.column_order
        column.decrement(:column_order,1)
        column.save
      end
    end
  end

  def move_remaining_stickies
    board_columns = Board.find(@column.board_id).columns
    destination_column = board_columns.find_by_column_order(@column.column_order-1)
    @column.stickies.each do |stickie|
      stickie.update_attribute(:column_id,destination_column.id)
    end
  end

end
