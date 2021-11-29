import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Documento} from './documento.model';

@model()
export class Otros extends Entity {
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

  @belongsTo(() => Documento, {name: 'otro_documento'})
  fk_documento: number;

  constructor(data?: Partial<Otros>) {
    super(data);
  }
}

export interface OtrosRelations {
  // describe navigational properties here
}

export type OtrosWithRelations = Otros & OtrosRelations;
