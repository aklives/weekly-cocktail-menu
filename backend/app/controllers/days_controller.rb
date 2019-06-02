class DaysController < ApplicationController

  def index
    @days = Day.all
    render json: @days
  end

  def new
    @day = Day.new
  end

  def create
    @day = Day.new(day_params)
    if @day.valid?
      @day.save
      render json: @day
    else
      render :new
    end
  end

  def show
    day_find
    render json: @day
  end

  def update
    day_find
    @day.update(day_params)
    render json: @day
  end

  def destroy
   day_find
   @day.destroy
   # render status: :ok
   render json: @day
  end


  private



  def day_params
    params.require(:day).permit(:name)
  end

  def day_find
    @day = Day.find(params[:id])
  end


  end
