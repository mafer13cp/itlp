import {Entity, model, property} from '@loopback/repository';

@model()
export class Tag extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;


  constructor(data?: Partial<Tag>) {
    super(data);
  }
}

export interface TagRelations {
  // describe navigational properties here
}

export type TagWithRelations = Tag & TagRelations;
