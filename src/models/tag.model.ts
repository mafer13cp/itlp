import {Entity, model, property, hasMany} from '@loopback/repository';
import {Documento} from './documento.model';
import {TagDoc} from './tag-doc.model';

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

  @hasMany(() => Documento, {through: {model: () => TagDoc, keyFrom: 'fk_tag', keyTo: 'fk_documento'}})
  documentos_tag: Documento[];

  constructor(data?: Partial<Tag>) {
    super(data);
  }
}

export interface TagRelations {
  // describe navigational properties here
}

export type TagWithRelations = Tag & TagRelations;
