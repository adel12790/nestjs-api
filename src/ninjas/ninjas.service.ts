import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas: CreateNinjaDto[] = [
    // dummy data
    {
      id: 1,
      name: 'Ryu',
      belt: 'black',
      weapon: 'shuriken',
      status: false,
    },
    {
      id: 2,
      name: 'Yoshi',
      belt: 'green',
      weapon: 'katana',
      status: true,
    },
  ];

  getNinjas(weapon?: string) {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }
    return this.ninjas;
  }

  getOneNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);

    if (!ninja) {
      throw new Error('Ninja not found');
    }

    return ninja;
  }

  createNinja(ninja: CreateNinjaDto) {
    const newNinja = {
      id: Date.now(),
      ...ninja,
    };

    this.ninjas.push(newNinja);

    return newNinja;
  }

  updateNinja(id: number, updateNinja: UpdateNinjaDto) {
    this.ninjas = this.ninjas.map((ninja) => {
      if (ninja.id === id) {
        return {
          ...ninja,
          ...updateNinja,
        };
      }
      return ninja;
    });
    return this.getOneNinja(id);
  }

  deleteNinja(id: string) {
    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== parseInt(id));
    return true;
  }
}
