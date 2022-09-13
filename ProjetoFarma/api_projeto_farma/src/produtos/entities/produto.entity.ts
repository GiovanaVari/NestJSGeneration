
import { IsNotEmpty, MaxLength } from "class-validator";
import { Categoria } from "src/categorias/entities/categoria.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_farma'})
export class Produto{
    
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @MaxLength(50)
    @Column({nullable: false, length: 100})
    nome: string

    @IsNotEmpty()
    @MaxLength(500)
    @Column({nullable: false, length: 500})
    descricao: string

    @IsNotEmpty()
    @Column({nullable: false})
    quantidade: number

    @IsNotEmpty()
    @Column({nullable: false})
    laboratorio: string

    @IsNotEmpty()
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    preco: number

    @IsNotEmpty()
    @Column({nullable: false})
    foto: string

    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria

}