class BoardsController < ApplicationController
  before_action :set_board, only: [:edit, :update, :destroy]

  def index
    @boards = Board.all
  end

  def create_board
    @board = Board.create(name: t(:your_board))
    redirect_to '/boards/'+@board.uid
  end

  def show
    @board = Board.find_by_uid params[:id]
    redirect_to(root_url, :notice => 'Board not found') unless @board
  end

  def new
    @board = Board.new
  end

  def edit
  end

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

  private

  def set_board
    @board = Board.find(params[:id])
  end

  def board_params
    params.require(:board).permit(:name, :uid)
  end

end
