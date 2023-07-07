import { useRef } from 'react';
import { useEffect, useState } from 'react';

let ActionCable = null as any;
if (typeof window !== 'undefined') {
  ActionCable = require('actioncable');
}

export const ChatConnection = () => {
  const channelRef = useRef<any>(null);
  const cableRef = useRef<any>(null);
  const [message, setMessage] = useState<string>(' デフォルト');

  useEffect(() => {
    const initWebSockt = async () => {
      const wsEndpoint = 'ws://localhost:3000/cable';
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
            console.log('broadcastしました');
            console.log(channelRef.current);
            return channelRef.current?.perform('broadcast_message', {
              chat_id: chatId,
            });
          },
        }
      );
    };

    initWebSockt();
    channelRef.current.broadcastMessage('hoge');

    return () => {
      channelRef.current.unsubscribe();
      cableRef.current.disconnect();
    };
  }, []);

  return <p>{message}</p>;
};
