import { Categoria } from './../entities/categoria.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { HttpException, HttpStatus,} from '@nestjs/common';

export class CategoriaService {
   // findByDescricao(descricao: string): Promise<Categoria[]> {
     //   throw new Error('Method not implemented.');
    //}
    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>
    ) { }

    async findAll(): Promise<Categoria[]> {
        return this.categoriaRepository.find({
            //relacionando categorias e produtos (inner)
            relations: {
                produtos: true
            }
        })
    }

    async findById(id: number): Promise<Categoria> {
        let categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
            relations: {
                produtos: true
            }
        })
        if (!categoria)
            throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND)

        return categoria
    }

    async findByNome(nome: string): Promise<Categoria[]> {
        return this.categoriaRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            relations: {
                produtos: true
            }
        })
    }

    async findByDescricao(descricao: string): Promise<Categoria[]> {
        return this.categoriaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                produtos: true
            }
        })
    }

    async create(categoria: Categoria): Promise<Categoria> {
        return this.categoriaRepository.save(categoria)
    }

    async update(categoria: Categoria): Promise<Categoria> {
        let categoriaUpdate = await this.findById(categoria.id)

        if (!categoriaUpdate || !categoria.id)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND)
        return this.categoriaRepository.save(categoria)
    }

    async delete(id: number): Promise<DeleteResult> {
        let categoriaDelete = await this.findById(id)

        if (!categoriaDelete)
            throw new HttpException('Produto não foi encontrado!', HttpStatus.NOT_FOUND)
        return this.categoriaRepository.delete(id)
    }
}