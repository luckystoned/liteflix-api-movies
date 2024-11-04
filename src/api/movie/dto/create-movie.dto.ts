import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatMovieRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly imgUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;
}
