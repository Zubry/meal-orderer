class OrdersController < ApplicationController
  before_action :require_authentication, only: [:update, :create]

  def new
  end

  def index
    @orders = Order.joins(:user)

    # Ok so when you join two tables, apparently the right table isn't automatically inserted into the record
    # I'm very likely doing something wrong, but I can't figure it out
    # So instead, I just insert it manually
    o = []
    @orders.each do |order|
      wtfhash = order.serializable_hash
      wtfhash[:user] = order.user
      o = o + [wtfhash]
    end

    render json: o
  end

  def meals
    @meals = Meal.joins(:user).where(order: params[:id])

    m = []
    @meals.each do |meal|
      wtfhash = meal.serializable_hash
      wtfhash[:user] = meal.user
      m = m + [wtfhash]
    end

    render json: m
  end

  def active
    @orders = Order.joins(:user).where(status: 'open')

    o = []
    @orders.each do |order|
      wtfhash = order.serializable_hash
      wtfhash[:user] = order.user
      o = o + [wtfhash]
    end

    render json: o
  end

  def history
    @orders = Order.joins(:user).where.not(status: 'open')

    o = []
    @orders.each do |order|
      wtfhash = order.serializable_hash
      wtfhash[:user] = order.user
      o = o + [wtfhash]
    end

    render json: o
  end

  def create
    @order = current_user
      .orders
      .create(restaurant: params['restaurant'], status: 'open')

    @order.save

    index
  end

  def show
    @order = Order.joins(:user).find(params[:id])

    o = @order.serializable_hash
    o[:user] = @order.user

    render json: o
  end

  def update
    @order = Order.find_by(id: params[:id], user_id: current_user.id)

    if ["open", "ordered", "delivered", "finalized"].include?(params[:order]['status']) and @order
      @order[:status] = params[:order]['status']
      @order.save
    end

    redirect_to @order
  end

  def order_params
    params.require(:order).permit(:restaurant, :string)
  end

  private
    def require_authentication
      if current_user.blank?
        flash[:error] = "You must be logged in to access this section"
        render plain: "Error"
      end
    end
end
