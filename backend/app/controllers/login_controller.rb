require 'jwt'
require_relative "../../db/users.rb"

class LoginController < ApplicationController
  def index

    id = params[:id]
    # idを使ってnameを取得する処理
    name = get_name(id)

    payload = {id:id,name:name}
    
    token = JWT.encode payload, nil, 'none'
    render json: token
  end


  def get_name(id)
    # p [1, 2, 3, 4, 5] find { |i| i % 2 == 0 }
    # users = [{name: "abc", id: "123"}, {name: "def", id: "456"}]
    # user_a = users.find { |user| user[:id] == id }
    # puts user_a
    puts id
    user = $users.find { |user| user[:id] == id }
    puts user
    return  user[:name]  
  end



end

