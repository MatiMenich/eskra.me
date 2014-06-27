class BoardsController < ApplicationController
  before_action :set_board, only: [:edit, :update, :destroy]

  def index
    @boards = Board.all
  end

  def create_board
    @board = Board.create(name: t(:your_board))
    redirect_to '/boards/'+@board.uid
  end

  # GET /boards/1
  # GET /boards/1.json
  def show
    uid = params[:id]
    if uid.nil?
      @board = Board.create(name: t(:your_board))
    else
      unless params[:locale].nil?
        case params[:locale]
        when 'es'
          I18n.locale = :es
        when 'en'
          I18n.locale = :en
        when 'jp'
          I18n.locale = :jp
        when 'zh'
          I18n.locale = :zh
        end
      end
      @board = Board.find_by_uid! uid
    end
  end

  # GET /boards/new
  def new
    @board = Board.new
  end

  # GET /boards/1/edit
  def edit
  end

  # POST /boards
  # POST /boards.json
  def create
    @board = Board.new(board_params)

    respond_to do |format|
      if @board.save
        format.html { redirect_to @board, notice: 'Board was successfully created.' }
        format.json { render :show, status: :created, location: @board }
      else
        format.html { render :new }
        format.json { render json: @board.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /boards/1
  # PATCH/PUT /boards/1.json
  def update
    respond_to do |format|
      if @board.update(board_params)
        format.html { redirect_to @board, notice: 'Board was successfully updated.' }
        format.json { render :show, status: :ok, location: @board }
      else
        format.html { render :edit }
        format.json { render json: @board.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /boards/1
  # DELETE /boards/1.json
  def destroy
    @board.destroy
    respond_to do |format|
      format.html { redirect_to boards_url, notice: 'Board was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_board
    @board = Board.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def board_params
    params.require(:board).permit(:name, :uid)
  end
end
