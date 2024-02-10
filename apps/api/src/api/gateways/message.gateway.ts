import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import { MessageDto } from '../dto/message.dto';
import { MessageService } from '../services/message.service';
import { MessageMapper } from '../mappers/message.mapper';

const port = 8001;

@WebSocketGateway(port, { cors: '*' })
export class MessageGateway {
  constructor(
    private messageService: MessageService,
    private messageMapper: MessageMapper,
  ) {}

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('room')
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { auctionId: string },
  ) {
    client.join(body.auctionId);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: MessageDto) {
    const { message, user } = await this.messageService.saveMessage(data);
    const userMessage = this.messageMapper.getUserMessage(message, user);
    this.server.to(data.auctionId).emit('message', userMessage);
  }
}
