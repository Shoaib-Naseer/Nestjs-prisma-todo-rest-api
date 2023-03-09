import { Controller, Get, Post, Body, Patch, Param, Delete ,ValidationPipe, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { RoleGuard } from 'src/auth/guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get all users and delete a single user route is only for admin

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto):Promise<User> {
    return this.userService.signup(createUserDto);
  }

  // This route is for admin only
  @UseGuards(new RoleGuard("ADMIN"))
  @Get('all')
  findAll() :Promise<User[]>{
    return this.userService.findAll();
  }

  
  @Get('email')
  findByEmail(@Body('email') email: string):Promise<User |null> {
    console.log(email)
    return this.userService.findByEmail(email);
  }



  @Get(':id')
  findById(@Param('id') id: string):Promise<User |null> {
    return this.userService.findById(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto):Promise<User |null> {
    return this.userService.update(+id, updateUserDto);
  }

  // This route is for admin only
  @UseGuards(new RoleGuard("ADMIN"))
  @Delete(':id')
  remove(@Param('id') id: string):Promise<string|null> {
    return this.userService.remove(+id);
  }
}
