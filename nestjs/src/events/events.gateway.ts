import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Client connected: ' + socket.id);
    });
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('payload', payload);
    return 'Hello world!';
  }

  @SubscribeMessage('join-message')
  handleMessageJoin(
    @MessageBody('room') room: string,
    @ConnectedSocket() client: Socket,
  ): string {
    client.join(room);
    console.log(`${client.id} joined ${room}`);
    return room;
  }

  @SubscribeMessage('room-message')
  handleEventRoom(
    @MessageBody('message') message: string,
    @MessageBody('room') room: string,
    @ConnectedSocket() client: Socket,
  ): string {
    this.server.in(room).emit('room-message', { message });
    return message;
  }

  //   @SubscribeMessage('room-message')
  //   handleEventLeave(
  //     @MessageBody('message') message: string,
  //     @MessageBody('room') room: string,
  //     @ConnectedSocket() client: Socket,
  //   ): string {
  //     client.leave(room);
  //     console.log(`${client.id} has left ${room}`);

  //     return message;
  //   }

  @SubscribeMessage('events')
  handleEvent(@MessageBody('message') message: string): string {
    this.server.emit('newMessage', {
      message: `New message from server: ${message}`,
    });
    return message;
  }

  @SubscribeMessage('events-join')
  handleEventJoin(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    return data;
  }
}
