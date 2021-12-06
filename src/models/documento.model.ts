import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Materia} from './materia.model';
import {Otros} from './otros.model';
import {Comentario} from './comentario.model';
import {Rating} from './rating.model';
import {Usuario} from './usuario.model';
import {Autor} from './autor.model';
import {Tag} from './tag.model';
import {TagDoc} from './tag-doc.model';

@model({
  settings: {
    foreignKeys: {
      fk_materia: {
        name: 'fk_materia',
        entity: 'Materia',
        entityKey: 'id',
        foreignKey: 'fk_materia',
      },
    },
  }
})
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
  imgUrl: string;

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

  @hasMany(() => Usuario, {through: {model: () => Autor, keyFrom: 'fk_documento', keyTo: 'fk_usuario'}})
  usuarios_documento: Usuario[];

  @hasMany(() => Tag, {through: {model: () => TagDoc, keyFrom: 'fk_documento', keyTo: 'fk_tag'}})
  tags_documento: Tag[];

  constructor(data?: Partial<Documento>) {
    super(data);
  }
}

export interface DocumentoRelations {
  // describe navigational properties here
}

export type DocumentoWithRelations = Documento & DocumentoRelations;
