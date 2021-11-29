import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Materia} from './materia.model';
import {Otros} from './otros.model';
import {Comentario} from './comentario.model';
import {Rating} from './rating.model';

@model()
export class Documento extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  archivoUrl: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @belongsTo(() => Materia, {name: 'documento_materia'})
  fk_materia: string;

  @hasMany(() => Otros, {keyTo: 'fk_documento'})
  otros_documento: Otros[];

  @hasMany(() => Comentario, {keyTo: 'fk_documento'})
  comentarios_documento: Comentario[];

  @hasMany(() => Rating, {keyTo: 'fk_documento'})
  ratings_documento: Rating[];

  constructor(data?: Partial<Documento>) {
    super(data);
  }
}

export interface DocumentoRelations {
  // describe navigational properties here
}

export type DocumentoWithRelations = Documento & DocumentoRelations;
