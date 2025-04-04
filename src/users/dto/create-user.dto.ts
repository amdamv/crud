import { MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3 )
  name: string;

  hobby: 'programmer' | 'volleyball player';
}