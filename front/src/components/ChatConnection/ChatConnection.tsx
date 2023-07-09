import { useRef } from 'react';
import { useEffect, useState } from 'react';
import ActionCable from 'actioncable';

export const ChatConnection = () => {
  const [message, setMessage] = useState<string>(' デフォルト');

  useEffect(() => {
    let channel: ActionCable.Channel & {
      connected: () => void;
      received: (data: any) => void;
      broadcastMessage: (chatId: string) => void;
    };
    const initWebSockt = async () => {
      const wsEndpoint = 'ws://localhost:3001/cable';
      const cable = ActionCable?.createConsumer(wsEndpoint);

      channel = cable.subscriptions.create(
        { channel: 'ChatChannel', chat_id: 'hoge' },
        {
          connected: () => {
            console.log('コネクト成功');
            channel.broadcastMessage('hoge');
          },
          received: (data: any) => {
            console.log('websocket受信しました');
            setMessage(data.message);
          },
          broadcastMessage: (chatId: string) => {
            channel.perform('broadcast_message1111', {
              // channel.perform('broadcast_message', {
              chat_id: chatId,
            });
            console.log('broadcastしました');
            return channel.perform('broadcast_message', {
              chat_id: chatId,
            });
          },
        }
      );
    };

    initWebSockt();

    // return () => {
    //   channelRef.current.unsubscribe();
    //   cableRef.current.disconnect();
    // };
  }, []);

  return <p>{message}</p>;
};
