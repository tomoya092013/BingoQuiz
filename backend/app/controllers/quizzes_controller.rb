class QuizzesController < ApplicationController
  def index
    @quizzes = Quiz.all
    render json: @quizzes
  end

  def show
    @quiz = Quiz.find(params[:id])
    @choices = @quiz.choices
    
    render json: {quiz:@quiz, choices:@choices}
  end

  def create
    @quiz = Quiz.new(quiz_params)
    @quiz.save
    render json: @quiz
  end

  def update

  end

  def destroy
    @quiz = Quiz.find(params[:id])
    @quiz.destroy
  end


  private

  def quiz_params
    params.require(:quiz).permit(:no,:content, :correct_mark, :is_answer_opened)
  end
end
