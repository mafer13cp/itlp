import {Entity, model, property} from '@loopback/repository';

@model()
export class Carrera extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  siglas: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;


  constructor(data?: Partial<Carrera>) {
    super(data);
  }
}

export interface CarreraRelations {
  // describe navigational properties here
}

export type CarreraWithRelations = Carrera & CarreraRelations;
