class DayCocktailsController < ApplicationController

  def index
    @day_cocktails = DayCocktail.all
    render json: @day_cocktails
  end

  def new
    @day_cocktail = DayCocktail.new
  end

  def create
    @day_cocktail = DayCocktail.new(day_cocktail_params)
    if @day_cocktail.valid?
      @day_cocktail.save
      render json: @day_cocktail
    else
      render :new
    end
  end

  def show
    day_cocktail_find
    render json: @day_cocktail
  end

  def update
    day_cocktail_find
    @day_cocktail.update(day_cocktail_params)
    render json: @day_cocktail
  end

  def destroy
   day_cocktail_find
   @day_cocktail.destroy
   # render status: :ok
   render json: @day_cocktail
 end



  private

  def day_cocktail_params
    params.require(:day_cocktail).permit(:cocktail_id, :day_id)
  end

  def day_cocktail_find
    @day_cocktail = DayCocktail.find(params[:id])
  end


end
