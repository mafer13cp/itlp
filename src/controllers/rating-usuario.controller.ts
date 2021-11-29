import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Rating,
  Usuario,
} from '../models';
import {RatingRepository} from '../repositories';

export class RatingUsuarioController {
  constructor(
    @repository(RatingRepository)
    public ratingRepository: RatingRepository,
  ) { }

  @get('/ratings/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Rating',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.number('id') id: typeof Rating.prototype.id,
  ): Promise<Usuario> {
    return this.ratingRepository.rating_usuario(id);
  }
}
