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
  Documento,
} from '../models';
import {RatingRepository} from '../repositories';

export class RatingDocumentoController {
  constructor(
    @repository(RatingRepository)
    public ratingRepository: RatingRepository,
  ) { }

  @get('/ratings/{id}/documento', {
    responses: {
      '200': {
        description: 'Documento belonging to Rating',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Documento)},
          },
        },
      },
    },
  })
  async getDocumento(
    @param.path.number('id') id: typeof Rating.prototype.id,
  ): Promise<Documento> {
    return this.ratingRepository.rating_documento(id);
  }
}
