import {Entity, model, property} from '@loopback/repository';

@model()
export class Rating extends Entity {
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
    type: 'number',
    required: true,
  })
  calificacion: number;


  constructor(data?: Partial<Rating>) {
    super(data);
  }
}

export interface RatingRelations {
  // describe navigational properties here
}

export type RatingWithRelations = Rating & RatingRelations;
