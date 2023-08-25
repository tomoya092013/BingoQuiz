require 'jwt'
require_relative "../../db/guests.rb"

class LoginController < ApplicationController
  def index
    name = params[:name]
    id = get_id(name)
    if id == nil 
      then  return render ""  end
    payload = { id: id, name: name }
    
    token = JWT.encode payload, nil, 'none'
    render json: token
  end


  def get_id(name)
    guest = $guests.find { |guest| guest[:name] == name }
    if guest == nil then return nil end
    return  guest[:id]  
  end

end
