class RowsController < ApplicationController
  before_action :set_row, only: [:show, :edit, :update, :destroy]

  # GET /rows
  def index
    @rows = Row.all
  end

  # GET /rows/1
  def show
  end

  # GET /rows/new
  def new
    @row = Row.new
  end

  # GET /rows/1/edit
  def edit
  end

  # POST /rows
  def create
    @row = Row.new(row_params)

    respond_to do |format|
      if @row.save
        format.json { render :show, status: :created, location: @row }
      else
        format.json { render json: @row.errors, status: :unprocessable_entity }
      end
    end

  end

  # PATCH/PUT /rows/1
  def update

    respond_to do |format|
      if @row.update(row_params)
        format.json { render :show, status: :ok, location: @row }
      else
        format.json { render json: @row.errors, status: :unprocessable_entity }
      end
    end

  end

  # DELETE /rows/1
  def destroy
    @row.destroy

    respond_to do |format|
      format.json { head :no_content }
    end
    
  end

  private

    def set_row
      @row = Row.find(params[:id])
    end

    def row_params
      params.require(:row).permit(:name, :order, :board_id)
    end
end
