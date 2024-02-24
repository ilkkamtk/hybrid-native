import {io, Socket} from 'socket.io-client';

import {ClientToServerEvents, ServerToClientEvents} from '../types/LocalTypes';

// socket.io client
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  process.env.EXPO_PUBLIC_SOCKET_SERVER!,
  {
    path: '/socket/socket/socket.io',
    transports: ['websocket'],
  },
);

console.log('socket url', process.env.EXPO_PUBLIC_SOCKET_SERVER!, socket);

export default socket;
