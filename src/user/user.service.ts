import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForbiddenException } from "@nestjs/common/exceptions";


@Injectable()
export class UserService {
  constructor(private prisma:PrismaService){}

  
  async signup(createUserDto: CreateUserDto):Promise<User> {
    try {
      const user = await  this.prisma.user.create({
        data:{
          email:createUserDto.email,
          firstName:createUserDto.firstName,
          lastName:createUserDto.lastName,
          password:createUserDto.password,
          role:createUserDto.role,
        }
      })
      return user
    } catch (error) {
      if(error.code =='P2002'){
        throw new ForbiddenException("Credentials taken")
    }
    throw error;
    }
  }

  async findAll():Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findByEmail(email:string) :Promise<User|null>{
    try{
      return this.prisma.user.findUnique({
        where:{
          email
        }
      });
    }catch(err){
      return err
    }
  }

  async findById(id:number) :Promise<User|null>{
    
      return this.prisma.user.findUniqueOrThrow({
        where:{
          id
        }
      });
  }

  async update(id: number, updateUserDto: UpdateUserDto):Promise<User |null> {
    return this.prisma.user.update({
      where:{
        id
      },
        data:{
          email:updateUserDto.email,
          firstName:updateUserDto.firstName,
          lastName:updateUserDto.lastName,
          password:updateUserDto.password,
          role:updateUserDto.role,
    }
  })
}

  async remove(id: number):Promise<string|null> {
    await this.prisma.user.delete({
      where:{
        id
      }
    });
    return `Successfully deleted the user of id ${id}`
  }
}
