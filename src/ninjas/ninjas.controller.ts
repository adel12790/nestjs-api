import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { NinjasService } from './ninjas.service';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { BeltGuard } from './belt/belt.guard';

@Controller('ninjas')
@UseGuards(BeltGuard)
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}
  @Get()
  getNinjas(@Query('weapon') weapon: string) {
    return this.ninjasService.getNinjas(weapon);
  }

  @Get(':id')
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getOneNinja(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto);
  }

  @Put(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinja: UpdateNinjaDto,
  ) {
    return this.ninjasService.updateNinja(id, updateNinja);
  }

  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjasService.deleteNinja(id);
  }
}
