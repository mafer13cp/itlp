import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_usuario: {
        name: 'fk_usuario',
        entity: 'Usuario',
        entityKey: 'id',
        foreignKey: 'fk_usuario',
      },
      fk_documento: {
        name: 'fk_documento',
        entity: 'Documento',
        entityKey: 'id',
        foreignKey: 'fk_documento',
      },
    },
  }
})
export class Autor extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  fk_usuario?: string;

  @property({
    type: 'number',
  })
  fk_documento?: number;

  constructor(data?: Partial<Autor>) {
    super(data);
  }
}

export interface AutorRelations {
  // describe navigational properties here
}

export type AutorWithRelations = Autor & AutorRelations;
