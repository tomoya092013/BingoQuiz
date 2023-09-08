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

      (1..5).each do |enquete_number|
        update_quizzes_based_on_enquete(enquete_number)
      end
      render json: @new_enquete
    else
      @enquete.update(enquete_params)

      (1..5).each do |enquete_number|
        update_quizzes_based_on_enquete(enquete_number)
      end
      render json: @enquete
    end
  end

  private

  def enquete_params
    params.require(:enquete).permit(:guest_id, :enquete_1, :enquete_2, :enquete_3, :enquete_4, :enquete_5)
  end

  def update_quizzes_based_on_enquete(enquate_number)
    enquetes = Enquete.all
    total_enquete_1 = enquetes.sum("enquete_#{enquate_number}".to_sym)
    enquetes_count = enquetes.count
    avarage_count = total_enquete_1 / enquetes_count
    if avarage_count > 50
      new_answer = 'A'
    elsif avarage_count < 50
      new_answer = 'B'
    else 
      new_answer = 'C'
    end

    quiz = Quiz.find_by(id: enquate_number)
    quiz.correct_mark = new_answer
    quiz.save
  end
  
end
