import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Tarefa } from "../entities/tarefa.entity";
import { TarefaService } from "../service/tarefe.service";

@Controller('/tarefa')
export default class TarefaController {
    tarefaRepository: any;
    constructor(private readonly service: TarefaService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Tarefa[]> {
        return this.service.asyncfindAll()

    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Tarefa> {
        return this.service.findById(id)
    }

    @Get('/nome/:nome')
    @HttpCode(HttpStatus.OK)
    findByNome(@Param('nome') nome: string): Promise<Tarefa[]>{
        return this.service.findByNome(nome)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() tarefa: Tarefa): Promise<Tarefa> {
        return this.service.create(tarefa)
    }

   @Put()
   @HttpCode(HttpStatus.OK)
   update(@Body() tarefa: Tarefa): Promise<Tarefa> {
    return this.service.update(tarefa)
   }
    
   @Delete('/:id')
   @HttpCode(HttpStatus.NO_CONTENT)
   delete(@Param('id', ParseIntPipe) id: number){
    return this.service.delete(id)
   }
}
