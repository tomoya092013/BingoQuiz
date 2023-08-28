class EnquetesController < ApplicationController
  def index
    @enquetes = Enquete.all
    render json: @enquetes
  end

  def create_or_update
    @guest_id = params[:guest_id]
    @enquete = Enquete.find_by(guest_id: @guest_id)
    if @enquete.nil?
      @new_enquete = Enquete.new(enquete_params)
      @new_enquete.save
      render json: @new_enquete
    else
      @enquete.update(enquete_params)
      render json: @enquete
    end
  end

  private

  def enquete_params
    params.require(:enquete).permit(:guest_id, :enquete_1, :enquete_2, :enquete_3, :enquete_4, :enquete_5)
  end
  
end
