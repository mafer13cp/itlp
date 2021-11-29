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
  Rating,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioRatingController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/ratings', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Rating',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rating)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Rating>,
  ): Promise<Rating[]> {
    return this.usuarioRepository.ratings_usuario(id).find(filter);
  }

  @post('/usuarios/{id}/ratings', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rating)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {
            title: 'NewRatingInUsuario',
            exclude: ['id'],
            optional: ['fk_usuario']
          }),
        },
      },
    }) rating: Omit<Rating, 'id'>,
  ): Promise<Rating> {
    return this.usuarioRepository.ratings_usuario(id).create(rating);
  }

  @patch('/usuarios/{id}/ratings', {
    responses: {
      '200': {
        description: 'Usuario.Rating PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {partial: true}),
        },
      },
    })
    rating: Partial<Rating>,
    @param.query.object('where', getWhereSchemaFor(Rating)) where?: Where<Rating>,
  ): Promise<Count> {
    return this.usuarioRepository.ratings_usuario(id).patch(rating, where);
  }

  @del('/usuarios/{id}/ratings', {
    responses: {
      '200': {
        description: 'Usuario.Rating DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Rating)) where?: Where<Rating>,
  ): Promise<Count> {
    return this.usuarioRepository.ratings_usuario(id).delete(where);
  }
}
