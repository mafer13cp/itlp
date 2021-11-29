import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Documento} from './documento.model';
import {Usuario} from './usuario.model';

@model()
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
