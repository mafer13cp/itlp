import {Entity, model, property} from '@loopback/repository';

@model()
export class Alumno extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  fk_usuario: string;

  @property({
    type: 'string',
    required: true,
  })
  fk_carrera: string;


  constructor(data?: Partial<Alumno>) {
    super(data);
  }
}

export interface AlumnoRelations {
  // describe navigational properties here
}

export type AlumnoWithRelations = Alumno & AlumnoRelations;
