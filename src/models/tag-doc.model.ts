import {Entity, model, property} from '@loopback/repository';

@model()
export class TagDoc extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;


  constructor(data?: Partial<TagDoc>) {
    super(data);
  }
}

export interface TagDocRelations {
  // describe navigational properties here
}

export type TagDocWithRelations = TagDoc & TagDocRelations;
