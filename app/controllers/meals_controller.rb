class MealsController < ApplicationController
  before_action :require_authentication, only: [:update, :create]
  before_action :require_open_order, only: [:update, :create]

  def new
  end

  def index
    @meals = Meal.joins(:user)

    m = []
    @meals.each do |meal|
      wtfhash = meal.serializable_hash
      wtfhash[:user] = meal.user
      m = m + [wtfhash]
    end

    render json: m
  end

  def create
    Meal
      .create_with(name: params[:meal]['name'], price: params[:meal]['price'])
      .find_or_create_by(order: params[:meal]['order'], user_id: current_user.id)

    @meals = Meal.joins(:user).where(order: params[:meal]['order'])

    m = []
    @meals.each do |meal|
      wtfhash = meal.serializable_hash
      wtfhash[:user] = meal.user
      m = m + [wtfhash]
    end

    render json: m
  end

  def update
  end

  def meal_params
    params.require(:order).permit(:order, :string, :name, :string, :price, :string)
  end

  private
    def require_authentication
      if current_user.blank?
        flash[:error] = "You must be logged in to access this section"
        render plain: "Error"
      end
    end

    def require_open_order
      unless Order.open?(params[:meal]['order'])
        flash[:error] = "This order is not open"
        render plain: "Error"
      end
    end
end
