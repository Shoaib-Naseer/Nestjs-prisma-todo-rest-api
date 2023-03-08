import { Injectable } from '@nestjs/common';
import { Todos } from '@prisma/client';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {

  constructor(private prisma:PrismaService , private userService:UserService){}

  async create(createTodoDto: CreateTodoDto, userId:number ,res:Response):Promise<Todos|string> {
    try {
      const user = await this.userService.findById(userId)
      console.log(user)
      if(user){
        const todo = await this.prisma.todos.create({
          data:{
            title:createTodoDto.title,
            completed:createTodoDto.completed,
            userId
          }

        })
        return todo;
      }else{
        return "User Doesnt exist"
      }
    } catch (error) {
      if (error.code=='P2025') {
        res.status(404)
        return ("User doesnt Exist Please try again later")
      }
      return error
    }
  }

  async findAllUncompletedTodos(userId:number,res:Response) {
    try {
      const user = await this.userService.findById(userId)
    //this will return all the todos which are uncompleted
      return this.prisma.todos.findMany({where:{
        user:{id:userId},completed:false
      },include:{user:true}})
    
  }catch(error){
    if (error.code=='P2025') {
      res.status(404)
      return ("User doesnt Exist Please try again later")
    }
    return error
  }


}

async findAllCompletedTodos(userId:number,res:Response) {
  try {
    const user = await this.userService.findById(userId)
  //this will return all the todos which are uncompleted
    return this.prisma.todos.findMany({where:{
      user:{id:userId},completed:true
    },include:{user:true}})
  
}catch(error){
  if (error.code=='P2025') {
    res.status(404)
    return ("User doesnt Exist Please try again later")
  }
  return error
}


}

async findAllTodos() :Promise<Todos[]>{
  //this will return all the todos which are uncompleted
    const todo = await this.prisma.todos.findMany({orderBy:{
      createdAt:'asc'
    }})
    return todo;

}


async findAllTodosUser(userId:number,res:Response) :Promise<Todos[] | string>{
  try {
    const user = await this.userService.findById(userId)
  //this will return all the todos which are uncompleted
    if(user){
      return this.prisma.todos.findMany({where:{
        user:{id:userId}},include:{user:true}})
    }else{
      res.status(404)
    return ("User doesnt Exist Please try again later")
    }
  
}catch(error){
  if (error.code=='P2025') {
    res.status(404)
    return ("User doesnt Exist Please try again later")
  }
  res.status(404)
  return error
}

}

  //return single Todo details based on its id
  async findOne(id: number,res:Response):Promise<Todos |string> {
    try {
      const todo = await this.prisma.todos.findUnique({
        where:{
          id
        }
      });
      return todo
    } catch (error) {
        if (error.code=='P2025') {
          res.status(404)
          return ("Todo doesnt Exist Please try again later")
    }
    
    return error;
  }
  }

  //update single Todo details based on its id
  async update(id: number, updateTodoDto: UpdateTodoDto,res:Response):Promise<Todos | string> {
    try {
      const todo = await this.prisma.todos.findUnique({where :{id}})
      if(todo){
       const todo = await this.prisma.todos.update({where:{
          id    
        },
      data:{
        title:updateTodoDto.title,
        completed:updateTodoDto.completed
      }});
        return todo
      }else{
        res.status(404)
        return ("Todo doesnt Exist ")
      }
      
    } catch (error) {
      if (error.code=='P2025') {
        res.status(404)
        return ("Todo doesnt Exist ")
      }
      return error  
    }
  }


  //Mark a todo to complete based on todo id
  async markComplete(id: number,res:Response):Promise<Todos | string> {
    try {
      const todo = await this.prisma.todos.findUnique({where :{id}})
      if(todo){
       const todo = await this.prisma.todos.update({where:{
          id    
        },
      data:{
        
        completed:true
      }});
        return todo
      }else{
        res.status(404)
        return ("Todo doesnt Exist ")
      }
      
    } catch (error) {
      if (error.code=='P2025') {
        res.status(404)
        return ("Todo doesnt Exist ")
      }
      return error  
    }
  }
  //Delete a Todo based on only its id
  async remove(id: number, res:Response) :Promise<string>{
    try {
      const todo = await this.prisma.todos.findUnique({where :{id}})
      if(todo){
        await this.prisma.todos.delete({where:{
          id
        }});
        return "SuccessFully Deleted"
      }
      else{ 
        res.status(404)
        return ("Todo doesnt Exist ")

      }
  } catch (error) {
    if (error.code=='P2025') {
      res.status(404)
      return ("Todo doesnt Exist ")
    }
    res.status(404)
    return error.name
  }
  }}
