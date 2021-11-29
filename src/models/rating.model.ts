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
export class Rating extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  calificacion: number;

  @belongsTo(() => Documento, {name: 'rating_documento'})
  fk_documento: number;

  @belongsTo(() => Usuario, {name: 'rating_usuario'})
  fk_usuario: string;

  constructor(data?: Partial<Rating>) {
    super(data);
  }
}

export interface RatingRelations {
  // describe navigational properties here
}

export type RatingWithRelations = Rating & RatingRelations;
