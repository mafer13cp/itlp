import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Materia} from './materia.model';

@model()
export class Carrera extends Entity {
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
  siglas: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Usuario, {keyTo: 'fk_carrera'})
  usuarios_carrera: Usuario[];

  @hasMany(() => Materia, {keyTo: 'fk_carrera'})
  materias_carrera: Materia[];

  constructor(data?: Partial<Carrera>) {
    super(data);
  }
}

export interface CarreraRelations {
  // describe navigational properties here
}

export type CarreraWithRelations = Carrera & CarreraRelations;
