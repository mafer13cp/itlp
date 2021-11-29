import {Entity, model, property} from '@loopback/repository';

@model()
export class Autor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  fk_documento?: number;

  @property({
    type: 'string',
  })
  fk_usuario?: string;

  constructor(data?: Partial<Autor>) {
    super(data);
  }
}

export interface AutorRelations {
  // describe navigational properties here
}

export type AutorWithRelations = Autor & AutorRelations;
