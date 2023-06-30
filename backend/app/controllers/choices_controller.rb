class ChoicesController < ApplicationController

  def index
    @choices = Choice.all
    render json: @choices
  end

  def show
    @choice = Choice.find(params[:id])
    render json: @choice
  end

  def create
    Choice.create(choiceList_params)
  end

  def update

  end

  private

  def choiceList_params
    params.require(:newChoiceList).map { |q_params| q_params.permit(:quiz_id, :mark, :content)}
  end
end
