module Admin
  class ShopsController < ApplicationController
    before_action :set_shop, only: [:show, :update, :destroy]

    # GET /admin/shops
    def index
      @shops = Shop.order(id: :desc)
      @shops = @shops.where(id: shop_params[:id]) if shop_params[:id].present?
      @shops = @shops.where("name LIKE ?", "%#{shop_params[:name]}%") if shop_params[:name].present?
      @shops = @shops.where("address LIKE ?", "%#{shop_params[:address]}%") if shop_params[:address].present?
      @shops = @shops.where("phone_number LIKE ?", "%#{shop_params[:phone_number]}%") if shop_params[:phone_number].present?
      @shops = @shops.where("website_url LIKE ?", "%#{shop_params[:website_url]}%") if shop_params[:website_url].present?

      paginate json: @shops
    end

    # GET /admin/shops/1
    def show
      render json: @shop
    end

    # POST /admin/shops
    def create
      @shop = Shop.new(shop_params)

      if @shop.save
        render json: @shop, status: :created
      else
        render json: @shop.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /admin/shops/1
    def update
      if @shop.update(shop_params)
        render json: @shop
      else
        render json: @shop.errors, status: :unprocessable_entity
      end
    end

    # DELETE /admin/shops/1
    def destroy
      @shop.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_shop
        @shop = Shop.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def shop_params
        params.require(:shop).permit(:id, :name, :address, :phone_number, :website_url)
      end
  end
end
