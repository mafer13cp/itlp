import {Entity, model, property} from '@loopback/repository';

@model()
export class TagDoc extends Entity {
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
  fk_tag: string;


  constructor(data?: Partial<TagDoc>) {
    super(data);
  }
}

export interface TagDocRelations {
  // describe navigational properties here
}

export type TagDocWithRelations = TagDoc & TagDocRelations;
