import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Rol} from './rol.model';
import {Carrera} from './carrera.model';
import {Comentario} from './comentario.model';
import {Rating} from './rating.model';
import {Documento} from './documento.model';
import {Autor} from './autor.model';

@model()
export class Usuario extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena: string;

  @property({
    type: 'string',
    required: false,
  })
  descripcion: string;

  @property({
    type: 'number',
    default: 0,
  })
  imagen?: number;

  @belongsTo(() => Rol, {name: 'usuario_rol'})
  fk_rol: number;

  @belongsTo(() => Carrera, {name: 'usuario_carrera'})
  fk_carrera: string;

  @hasMany(() => Comentario, {keyTo: 'fk_usuario'})
  comentarios_usuario: Comentario[];

  @hasMany(() => Rating, {keyTo: 'fk_usuario'})
  ratings_usuario: Rating[];

  @hasMany(() => Documento, {through: {model: () => Autor, keyFrom: 'fk_usuario', keyTo: 'fk_documento'}})
  documentos_usuario: Documento[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
