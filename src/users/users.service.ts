import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {id: 0, name: 'Akhmad', hobby: 'programmer'},
    {id: 1, name: 'Akhmad1', hobby: 'volleyball player'}
  ]

  getUsers(hobby?: 'programmer' | 'volleyball player'){
if (hobby){
  return this.users.filter((user)=> user.hobby === hobby)
}
return this.users
  }

  getOneUser(id: number){
   const user = this.users.find((user) => user.id === id)
    if (!user){
      throw new NotFoundException('User does not exist')
    }
    return user
  }

createUser(createUserDto: CreateUserDto){
    const newUser = {
      ...createUserDto,
      id: Date.now()
    }
    this.users.push(newUser)
}

updateUser(id: number, updateUserDto: UpdateUserDto){
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {...user, ...updateUserDto}
      }
      return user
    })
  return this.getOneUser(id)
}

removeUser(id: number){
    const toBeRemoved = this.getOneUser(id)
  this.users.filter((user) => user.id === id)
  return toBeRemoved
}

}
