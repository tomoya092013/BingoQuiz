class ChatChannel < ApplicationCable::Channel
 
  def subscribed
    stream_from "chat_channel_#{params[:chat_id]}"
    puts '購読成功'
  end
 
  def broadcast_message
    puts '通信成功'
    channel = "chat_channel_#{params[:chat_id]}"
 
    ActionCable.server.broadcast channel, message: 'ブロードキャストしています。'
  end
end