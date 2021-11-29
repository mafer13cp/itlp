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
  Usuario,
  Comentario,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioComentarioController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Comentario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comentario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Comentario>,
  ): Promise<Comentario[]> {
    return this.usuarioRepository.comentarios_usuario(id).find(filter);
  }

  @post('/usuarios/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comentario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {
            title: 'NewComentarioInUsuario',
            exclude: ['id'],
            optional: ['fk_usuario']
          }),
        },
      },
    }) comentario: Omit<Comentario, 'id'>,
  ): Promise<Comentario> {
    return this.usuarioRepository.comentarios_usuario(id).create(comentario);
  }

  @patch('/usuarios/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Usuario.Comentario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {partial: true}),
        },
      },
    })
    comentario: Partial<Comentario>,
    @param.query.object('where', getWhereSchemaFor(Comentario)) where?: Where<Comentario>,
  ): Promise<Count> {
    return this.usuarioRepository.comentarios_usuario(id).patch(comentario, where);
  }

  @del('/usuarios/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Usuario.Comentario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Comentario)) where?: Where<Comentario>,
  ): Promise<Count> {
    return this.usuarioRepository.comentarios_usuario(id).delete(where);
  }
}
