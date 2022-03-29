import { Injectable } from '@nestjs/common';
import { prismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import * as fs from 'fs';
@Injectable()
export class ReceitasService {
  constructor(private prisma: prismaService) {}

  async criarUsuario(dto) {
    const hash = await argon.hash(dto.senha);
    const response = await this.prisma.usuarios.create({
      data: {
        nickname: dto.nickname,
        senha: hash,
        email: dto.email,
      },
    });
    return response;
  }
  async criarReceita(dto) {
    //
    const text = dto.texto;
    const nomedoarquivo = `./src/LivroDeReceitas/${dto.autor}/${dto.autor}-${dto.nome}.txt`;
    if (!fs.existsSync(`./src/LivroDeReceitas/${dto.autor}`)) {
      await fs.mkdirSync(`./src/LivroDeReceitas/${dto.autor}`);
    }
    await fs.writeFile(nomedoarquivo, text, (err) => {
      console.log(err);
    });

    const response = await this.prisma.receita.create({
      data: {
        nome: dto.nome,
        autor: dto.autor
      },
    });
    return response;
  }
  async mostrarReceitasService() {
    const receitas = await this.prisma.receita.findMany();
    return receitas;
  }
  async deletarReceita(objetoComId) {
    const idPraTirar = objetoComId.id;
    console.log(idPraTirar);
    const qual = await this.prisma.receita.findUnique({
      where: { id: idPraTirar },
    });
    console.log(qual);
    if (!fs.existsSync(`./src/LivroDeReceitas/${qual.autor}`)) {
      console.log('autor nao existe');
    }
    const nomedoarquivo = `./src/LivroDeReceitas/${qual.autor}/${qual.autor}-${qual.nome}.txt`;
    if (fs.existsSync(nomedoarquivo)) {
      await fs.unlinkSync(nomedoarquivo);
    }
    const deletou = await this.prisma.receita.delete({
      where: {
        id: idPraTirar,
      },
    });
    return deletou;
  }
}
