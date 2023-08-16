require 'jwt'
require_relative "../../db/users.rb"

class LoginController < ApplicationController
  def index
    puts params[:name]
    name = params[:name]
    id = get_id(name)
    if id == nil 
      then  return render ""  end
    payload = { id: id, name: name }
    
    token = JWT.encode payload, nil, 'none'
    render json: token
  end


  def get_id(name)
    user = $users.find { |user| user[:name] == name }
    if user == nil then return nil end
    return  user[:id]  
  end

end
