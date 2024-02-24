import {useEffect, useState} from 'react';

import useUpdateContext from './UpdateHook';
import socket from '../lib/socket';

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const {setNewItems} = useUpdateContext();

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onAddMedia(value: string) {
      console.log('onAddMedia', value);
      setNewItems(true);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('addMedia', onAddMedia);
    socket.on('connect_error', (error) => {
      console.log('connect_error', error.message);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('addMedia', onAddMedia);
    };
  }, []);
  return {isConnected};
};

export default useSocket;
