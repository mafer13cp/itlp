import {Entity, model, property} from '@loopback/repository';

@model()
export class Autor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<Autor>) {
    super(data);
  }
}

export interface AutorRelations {
  // describe navigational properties here
}

export type AutorWithRelations = Autor & AutorRelations;
