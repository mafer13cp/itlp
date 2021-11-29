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
  Carrera,
  Usuario,
} from '../models';
import {CarreraRepository} from '../repositories';

export class CarreraUsuarioController {
  constructor(
    @repository(CarreraRepository) protected carreraRepository: CarreraRepository,
  ) { }

  @get('/carreras/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Carrera has many Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.carreraRepository.usuarios_carrera(id).find(filter);
  }

  @post('/carreras/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Carrera model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Carrera.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInCarrera',
            exclude: ['id'],
            optional: ['fk_carrera']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.carreraRepository.usuarios_carrera(id).create(usuario);
  }

  @patch('/carreras/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Carrera.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
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
    return this.carreraRepository.usuarios_carrera(id).patch(usuario, where);
  }

  @del('/carreras/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Carrera.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.carreraRepository.usuarios_carrera(id).delete(where);
  }
}
