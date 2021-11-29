import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_documento: {
        name: 'fk_documento',
        entity: 'Documento',
        entityKey: 'id',
        foreignKey: 'fk_documento',
      },
      fk_tag: {
        name: 'fk_tag',
        entity: 'Tag',
        entityKey: 'id',
        foreignKey: 'fk_tag',
      },
    },
  }
})
export class TagDoc extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  fk_tag?: number;

  @property({
    type: 'number',
  })
  fk_documento?: number;

  constructor(data?: Partial<TagDoc>) {
    super(data);
  }
}

export interface TagDocRelations {
  // describe navigational properties here
}

export type TagDocWithRelations = TagDoc & TagDocRelations;
