import {Entity, model, property} from '@loopback/repository';

@model()
export class Comentario extends Entity {
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
  fk_documento: string;

  @property({
    type: 'string',
    required: true,
  })
  fk_usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  texto: string;


  constructor(data?: Partial<Comentario>) {
    super(data);
  }
}

export interface ComentarioRelations {
  // describe navigational properties here
}

export type ComentarioWithRelations = Comentario & ComentarioRelations;
