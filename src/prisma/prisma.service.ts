import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class prismaService extends PrismaClient {
  constructor(){
    super({
      datasources:{
        db:{
          url:"mysql://root:Otr2832!@localhost:3306/receitas?schema=public"
        }
      }
    })
  }
}
