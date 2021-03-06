import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Documento} from './documento.model';
import {Usuario} from './usuario.model';

@model({
  settings: {
    foreignKeys: {
      fk_documento: {
        name: 'fk_documento',
        entity: 'Documento',
        entityKey: 'id',
        foreignKey: 'fk_documento',
      },
      fk_usuario: {
        name: 'fk_usuario',
        entity: 'Usuario',
        entityKey: 'id',
        foreignKey: 'fk_usuario',
      },
    },
  }
})
export class Comentario extends Entity {
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
  texto: string;
  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @belongsTo(() => Documento, {name: 'comentario_documento'})
  fk_documento: number;

  @belongsTo(() => Usuario, {name: 'comentario_usuario'})
  fk_usuario: string;

  constructor(data?: Partial<Comentario>) {
    super(data);
  }
}

export interface ComentarioRelations {
  // describe navigational properties here
}

export type ComentarioWithRelations = Comentario & ComentarioRelations;
