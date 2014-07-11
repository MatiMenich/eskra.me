class StickiesController < ApplicationController
  before_action :set_sticky, only: [:show, :edit, :update, :destroy]

  # GET /stickies
  def index
    @stickies = Sticky.all
  end

  # GET /stickies/1
  def show
  end

  # GET /stickies/new
  def new
    @sticky = Sticky.new
  end

  # GET /stickies/1/edit
  def edit
  end

  # POST /stickies
  def create
    @sticky = Sticky.new(sticky_params)

    respond_to do |format|
      if @sticky.save
        format.json { render :show, status: :created, location: @sticky }
      else
        format.json { render json: @sticky.errors, status: :unprocessable_entity }
      end
    end
    
  end

  # PATCH/PUT /stickies/1
  def update

    respond_to do |format|
      if @sticky.update(sticky_params)
        format.json { render :show, status: :ok, location: @sticky }
      else
        format.json { render json: @sticky.errors, status: :unprocessable_entity }
      end
    end

  end

  # DELETE /stickies/1
  def destroy
    @sticky.destroy

    respond_to do |format|
      format.json { head :no_content }
    end

  end

  private

    def set_sticky
      @sticky = Sticky.find(params[:id])
    end

    def sticky_params
      params.require(:sticky).permit(:name, :text, :link, :color, :column_id, :row_id)
    end
end
