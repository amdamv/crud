import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }
  @Get()
  getUsers(@Query('hobby') hobby: 'programmer' | 'volleyball player') {
    return this.usersService.getUsers(hobby)
  }

  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number){
    try{
      return this.usersService.getOneUser(id)
    }catch(error){
      throw new NotFoundException(error)
    }
  }

  @Post()
  createUsers(@Body() createUserDto: CreateUserDto){
    return this.usersService.createUser(createUserDto)
  }

  @Put(':id')
  updateUsers(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
    return this.usersService.updateUser(+id, updateUserDto)
  }

  @Delete(':id')
  removeUser(@Param('id') id: string){
    return this.usersService.removeUser(+id)
  }
}
