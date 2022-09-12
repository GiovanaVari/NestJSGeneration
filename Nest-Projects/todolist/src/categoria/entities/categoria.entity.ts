import { IsNotEmpty, MaxLength } from "class-validator"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tarefa } from 'src/tarefa/entities/tarefa.entity';

@Entity ('Tb_categoria')
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number
    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    descricao: string

    @OneToMany(() => Tarefa, (tarefa)=> tarefa.categoria)
    tarefas: Tarefa[]
}


