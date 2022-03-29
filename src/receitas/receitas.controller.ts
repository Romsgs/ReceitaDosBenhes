import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ReceitasService } from './receitas.service';
import { iCriar, iCriarReceita } from './dtoInterfaces';
@Controller('/receitas')
export class ReceitasController {
  constructor(private receitasService: ReceitasService) {}

  @Post('criarUsuario')
  async salvar(@Body() dto: iCriar) {
    const data = await this.receitasService.criarUsuario(dto);
    console.log(data);
    return data;
  }

  @Post('criarReceita')
  async salvarReceita(@Body() dto: iCriarReceita) {
    const data = await this.receitasService.criarReceita(dto);
    console.log(data);
    return data;
  }

  @Get('todas')
  async mostrarTodasReceitas() {
    const receitas = this.receitasService.mostrarReceitasService();
    return receitas;
  }
  
  @Delete('delete')
  async deletarReceita(@Body() id:number){
    console.log(id)
    const deletou = this.receitasService.deletarReceita(id);
    return deletou
  }
}
