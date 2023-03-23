/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets/interfaces/hooks';
import { Server, Socket } from 'socket.io';
import { UpdateMemberDto } from 'src/members/dtos/update-member.dto';
import { MembersService } from 'src/members/members.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private jwtService: JwtService,
    private membersService: MembersService,
  ) {}
  private devide = [];

  @WebSocketServer()
  server: Server;

  //   onModuleInit() {
  //     this.server.on('connection', (socket) => {
  //       console.log('Client connected: ' + socket.id);
  //       const jwtToken = socket.handshake.headers.authorization.split(' ')[1];
  //       const decoded = this.jwtService.verify(jwtToken);
  //       console.log(decoded);
  //     });
  //     this.server.on('disconnect', (socket) => {
  //       console.log('Client connected: ' + socket.id);
  //     });
  //   }

  async getDataUserFromToken(client: Socket) {
    try {
      const authToken = client.handshake?.headers?.authorization.split(' ')[1];
      const decoded = this.jwtService.verify(authToken);
      const user = await this.membersService.findByEmail(decoded.email);
      return user;
    } catch (ex) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  afterInit(server: Server) {
    console.log('Initial Server');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    try {
      console.log('Client connected: ' + client.id);
      const user = await this.getDataUserFromToken(client);
      console.log(user.email);
      this.devide.push({
        email: user.email,
        socketId: client.id,
      });
    } catch (error) {
      throw new WsException('Invalid credentials.');
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected: ' + client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('payload', payload);
    return 'Hello world!';
  }

  @SubscribeMessage('join-room')
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

  @SubscribeMessage('private-message')
  handleEventPrivate(
    @MessageBody('message') message: string,
    @MessageBody('to') to: string,
    @ConnectedSocket() client: Socket,
  ): string {
    this.server.to(to).emit('private-message', { message });
    return message;
  }
  @SubscribeMessage('update-member')
  async handleUpdateMember(@MessageBody() update: UpdateMemberDto) {
    const user = await this.membersService.updateMemberByEmail(update);
    // this.server.to(to).emit('private-message', { message });
    const currentUser = this.devide.find((item) => item.email === user.email);
    this.server.to(currentUser.socketId).emit('update-member', {
      message: `${currentUser.email} has been changed `,
    });

    return user;
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
}
