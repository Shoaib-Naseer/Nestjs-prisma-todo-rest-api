import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Response } from 'express';
import { Todos } from '@prisma/client';

// Add Todos Based on User Id
// Find All Todos based on User id which are not completed
// Find All Todos based on User id which are completed
// Find All Todos 
// Find All Todos based on User id 
// Delete Todo based on Todo ID
// Update Todo Based on Todo Id



@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(':userId')
  create(@Body() createTodoDto: CreateTodoDto , @Param('userId') userId:number, @Res({passthrough: true}) res: Response) {
    return this.todoService.create(createTodoDto,+userId,res);
  }

  @Get('all')
  findAll():Promise<Todos[]>{
    return this.todoService.findAllTodos()
  }
  @Get('all/:userId')
  findAllByUser(@Param('userId') userId:string , @Res({passthrough: true}) res: Response) :Promise<Todos[]| string>{
    return this.todoService.findAllTodosUser(+userId,res)
  }


  @Get('uncompleted/:userId')
  findAllUncompleted(@Param('userId') userId:string, @Res({passthrough: true}) res: Response) :Promise<Todos |string>{
    return this.todoService.findAllUncompletedTodos(+userId,res);
  }


  @Get('completed/:userId')
  findAllcompleted(@Param('userId') userId:string, @Res({passthrough: true}) res: Response) :Promise<Todos |string>{
    return this.todoService.findAllCompletedTodos(+userId,res);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Res({passthrough: true}) res: Response) {
    return this.todoService.findOne(+id,res);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto,@Res({passthrough: true}) res: Response) {
    return this.todoService.update(+id, updateTodoDto,res);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Res({passthrough: true}) res: Response) {
    return this.todoService.remove(+id,res);
  }
}
