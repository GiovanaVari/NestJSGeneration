import { IsNotEmpty, MaxLength } from "class-validator"
import { Produto } from "src/produtos/entities/produto.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"


@Entity ('Tb_categoria')
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    nome: string

    @IsNotEmpty()
    @MaxLength(255)
    @Column({nullable: false, length: 255})
    descricao: string

    @OneToMany(() => Produto, (produto)=> produto.categoria)
    produtos: Produto[]
    produto: any;
}