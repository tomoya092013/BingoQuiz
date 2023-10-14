class GuestSelectAnswerController < ApplicationController
  def index
    @guestSelectAnswers = GuestSelectAnswer.all
    render json: @guestSelectAnswers
  end

  def show
    @guestSelectAnswer = GuestSelectAnswer.find(params[:id])
    
    render json: {guestSelectAnswer:@guestSelectAnswer}
  end

  def create
    @guestSelectAnswer = GuestSelectAnswer.new(guest_select_answer_params)
    @guestSelectAnswer.save
    render json: {guestSelectAnswer:@guestSelectAnswer}
  end

  def update
    @guestSelectAnswer = GuestSelectAnswer.find(params[:id])
    @guestSelectAnswer.update(guest_select_answer_params)
  end

  def guest_select_answer_params
    params.require(:guest_select_answer).permit(:guest_id, :guest_name,:question_1_select_mark,:question_2_select_mark,:question_3_select_mark,:question_4_select_mark,:question_5_select_mark,:question_6_select_mark,:question_7_select_mark,:question_8_select_mark,:question_9_select_mark,:bingo, :correct_count)
  end
end
