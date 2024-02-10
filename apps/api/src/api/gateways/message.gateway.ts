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
import {BidDto} from "../dto/bid.dto";
import {BidService} from "../services/bid.service";
import {BidMapper} from "../mappers/bid.mapper";

const port = 8001;

@WebSocketGateway(port, { cors: '*', path: '/sockets' })
export class MessageGateway {
  constructor(
    private messageService: MessageService,
    private bidService: BidService,
    private messageMapper: MessageMapper,
    private bidMapper: BidMapper,
  ) {}

  @WebSocketServer()
  private server: Server;

  @SubscribeMessage('join')
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { auctionId: string },
  ) {
    client.join(body.auctionId);
  }

  @SubscribeMessage('leave')
  leaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() body: { auctionId: string },
  ) {
    client.leave(body.auctionId);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: MessageDto) {
    const { message, user } = await this.messageService.saveMessage(data);
    const userMessage = this.messageMapper.getUserMessage(message, user);
    this.server.to(data.auctionId).emit('message', userMessage);
  }

  @SubscribeMessage('bid')
  async makeBid(@MessageBody() data: BidDto) {
    const { bid, user } = await this.bidService.saveBid(data);
    const userBid = this.bidMapper.getUserBid(bid, user);
    this.server.to(data.auctionId).emit('bid', userBid);
  }
}
