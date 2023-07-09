import { useRef } from 'react';
import { useEffect, useState } from 'react';
import ActionCable from 'actioncable';

export const ChatConnectionOrg = () => {
  const channelRef = useRef<any>(null);
  const cableRef = useRef<any>(null);
  const [message, setMessage] = useState<string>(' デフォルト');

  useEffect(() => {
    const initWebSockt = async () => {
      const wsEndpoint = 'ws://localhost:3001/cable';
      cableRef.current = ActionCable?.createConsumer(wsEndpoint);

      channelRef.current = cableRef.current.subscriptions.create(
        { channel: 'ChatChannel', chat_id: 'hoge' },
        {
          connected: () => {
            console.log('コネクト成功');
          },
          received: (data: any) => {
            console.log('websocket受信しました');
            setMessage(data.message);
          },
          broadcastMessage: (chatId: string) => {
            channelRef.current.perform('broadcast_message1111', {
              // channelRef.current.perform('broadcast_message', {
              chat_id: chatId,
            });
            console.log('broadcastしました');
            return channelRef.current.perform('broadcast_message', {
              chat_id: chatId,
            });
          },
        }
      );
    };

    initWebSockt();
    channelRef.current.broadcastMessage('hoge');

    // return () => {
    //   channelRef.current.unsubscribe();
    //   cableRef.current.disconnect();
    // };
  }, []);

  return <p>{message}</p>;
};
