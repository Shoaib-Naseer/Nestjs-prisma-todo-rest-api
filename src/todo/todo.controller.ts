import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseGuards, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Response } from 'express';
import { Todos } from '@prisma/client';
import { JwtGuard, RoleGuard } from 'src/auth/guard';

// Add Todos Based on User Id
// Find All Todos based on User id which are not completed
// Find All Todos based on User id which are completed
// Find All Todos 
// Find All Todos based on User id 
// Delete Todo based on Todo ID
// Update Todo Based on Todo Id
// Mark todo Completed Based on Todo Id


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('')
  create(@Body() createTodoDto: CreateTodoDto , @Req() req:any, @Res({passthrough: true}) res: Response) {
    const userId = req.user.id
    return this.todoService.create(createTodoDto,+userId,res);
  }

  //This is admin Route

  @UseGuards(new RoleGuard('ADMIN'))
  @Get('all')
  findAll(@Req() req):Promise<Todos[]>{
    console.log(req.user)
    return this.todoService.findAllTodos()
  }


  @Get('all-user-todos')
  findAllByUser( @Res({passthrough: true}) res: Response,@Req() req) :Promise<Todos[]| string>{
    const userId : number = Number(req.user.id);
    console.log(userId)
    return this.todoService.findAllTodosUser(+userId,res)
  }


  @Get('uncompleted')
  findAllUncompleted( @Res({passthrough: true}) res: Response,@Req() req) :Promise<Todos |string>{
    const userId : number = Number(req.user.id);
    return this.todoService.findAllUncompletedTodos(+userId,res);
  }


  @Get('completed')
  findAllcompleted(@Res({passthrough: true}) res: Response,@Req() req) :Promise<Todos |string>{
    const userId : number = Number(req.user.id);
    return this.todoService.findAllCompletedTodos(+userId,res);
  }

  @Get(':id')
  findOne(@Param('id') id: string,@Res({passthrough: true}) res: Response,@Req() req) {
    const userId : number = Number(req.user.id);
    return this.todoService.findOne(+id,res,userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto,@Res({passthrough: true}) res: Response,@Req() req) {
    const userId : number = Number(req.user.id);
    return this.todoService.update(+id, updateTodoDto,res,userId);
  }
  // Mark to do completed based on todo id
  @Patch('markcomplete/:id')
  markComplete(@Param('id') id: string,@Res({passthrough: true}) res: Response,@Req() req) {
    const userId : number = Number(req.user.id);
    return this.todoService.markComplete(+id,res,userId);
  }

  // Delete todo based on todo-id
  @Delete(':id')
  remove(@Param('id') id: string,@Res({passthrough: true}) res: Response,@Req() req) {
    const userId : number = Number(req.user.id);
    return this.todoService.remove(+id,res,userId);
  }
}
