import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Carrera} from './carrera.model';
import {Documento} from './documento.model';

@model()
export class Materia extends Entity {
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
  nombre: string;

  @belongsTo(() => Carrera, {name: 'materia_carrera'})
  fk_carrera: string;

  @hasMany(() => Documento, {keyTo: 'fk_materia'})
  documentos_materia: Documento[];

  constructor(data?: Partial<Materia>) {
    super(data);
  }
}

export interface MateriaRelations {
  // describe navigational properties here
}

export type MateriaWithRelations = Materia & MateriaRelations;
