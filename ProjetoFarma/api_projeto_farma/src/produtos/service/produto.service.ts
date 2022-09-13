import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) { }

    asyncfindAll(): Promise<Produto[]> {
        return this.produtoRepository.find({
            // relacionando tarefas com categoria
            relations: {
                categoria: true
            }
        })
    }

    async findById(id: number): Promise<Produto> {
        let produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            // relacionando tarefas com categoria
            relations: {
                categoria: true
            }
        })

        if (!produto)
            throw new HttpException('produto não foi encontrada', HttpStatus.NOT_FOUND)

        return produto
    }

    async findByNome(nome: string): Promise<Produto[]> {
        return this.produtoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            // relacionando tarefas com categoria
            relations: {
                categoria: true
            }
        })
    }
    async create(produto: Produto): Promise<Produto> {
        return this.produtoRepository.save(produto)
    }
    async update(produto: Produto): Promise<Produto> {
        let produtoUpdate = await this.findById(produto.id)

        if (!produtoUpdate || !produto.id)
            throw new HttpException('Tarefa não encontrada!', HttpStatus.NOT_FOUND)
        return this.produtoRepository.save(produto)
    }

    async delete(id: number): Promise<DeleteResult> {
        let produtoDelete = await this.findById(id)

        if (!produtoDelete)
            throw new HttpException('Tarefa não foi encontrada!', HttpStatus.NOT_FOUND)
        return this.produtoRepository.delete(id)
    }

}