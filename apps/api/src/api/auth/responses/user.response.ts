import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ description: 'User id' })
    id: string;

  @ApiProperty({ description: 'User first name' })
    firstName: string;

  @ApiProperty({ description: 'User middle name' })
    middleName: string;

  @ApiProperty({ description: 'User last name' })
    lastName: string;

  @ApiProperty({ description: 'User email' })
    email: string;

  @ApiProperty({
    description: 'User status',
    enum: ['APPROVED', 'PENDING', 'DECLINED'],
  })
    status: string;

  @ApiProperty({ description: 'User auctions ids' })
    auctions: string[];

  @ApiProperty({ description: 'Date of user creation' })
    createdAt?: Date;

  @ApiProperty({ description: 'Date of user update' })
    updatedAt?: Date;
}
