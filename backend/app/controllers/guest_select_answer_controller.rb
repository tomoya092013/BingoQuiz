class GuestSelectAnswerController < ApplicationController
  def index
    @guestSelectAnswers = GuestSelectAnswer.all
    render json: @guestSelectAnswers
  end

  def show
    @guestSelectAnswer = GuestSelectAnswer.find(params[:id])
    
    render json: {guestSelectAnswer:@guestSelectAnswer}
  end
  # def show
  #   guest_id = params[:guest_id]
  #   question_id = params[:question_id]
  #   @guestSelectAnswer = GuestSelectAnswer.find_by(guest_id: guest_id, question_id: question_id)

  #   puts @guestSelectAnswer
  #   puts 'あ'
  #   render json: @guestSelectAnswer
  # end

  def create
    @guestSelectAnswer = GuestSelectAnswer.new(guest_select_answer_params)
    @guestSelectAnswer.save
    render json: @guestSelectAnswer
  end

  def update
    @guestSelectAnswer = GuestSelectAnswer.find(params[:id])
    @guestSelectAnswer.update(guest_select_answer_params)
    render json: @guestSelectAnswer
  end

  def guest_select_answer_params
    params.require(:guest_select_answer).permit(:guest_id, :question_1_select_mark,:question_2_select_mark,:question_3_select_mark,:question_4_select_mark,:question_5_select_mark,:question_6_select_mark,:question_7_select_mark,:question_8_select_mark,:question_9_select_mark)
  end
end
