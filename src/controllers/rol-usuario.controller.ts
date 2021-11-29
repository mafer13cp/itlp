import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Rol,
  Usuario,
} from '../models';
import {RolRepository} from '../repositories';

export class RolUsuarioController {
  constructor(
    @repository(RolRepository) protected rolRepository: RolRepository,
  ) { }

  @get('/roles/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Rol has many Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.rolRepository.usuarios_rol(id).find(filter);
  }

  @post('/roles/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Rol.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInRol',
            exclude: ['id'],
            optional: ['fk_rol']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.rolRepository.usuarios_rol(id).create(usuario);
  }

  @patch('/roles/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Rol.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.rolRepository.usuarios_rol(id).patch(usuario, where);
  }

  @del('/roles/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Rol.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.rolRepository.usuarios_rol(id).delete(where);
  }
}
