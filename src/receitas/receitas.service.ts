import { Injectable } from '@nestjs/common';
import { prismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
@Injectable()
export class ReceitasService {

  constructor(private prisma: prismaService) {}

  async criarReceitaService(dto) {
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
}
