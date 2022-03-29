import { Body, Controller } from '@nestjs/common';
import { ReceitasService } from './receitas.service';
import { iCriar } from './dto';
@Controller('/receitas')
export class ReceitasController {
  constructor(private receitasService: ReceitasService) {}

  salvar(@Body() dto: iCriar){
    const data = this.receitasService.criarReceitaService(dto)
    console.log(data)
    return data
  }
}
