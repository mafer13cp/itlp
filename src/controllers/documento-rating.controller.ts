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
  Documento,
  Rating,
} from '../models';
import {DocumentoRepository} from '../repositories';

export class DocumentoRatingController {
  constructor(
    @repository(DocumentoRepository) protected documentoRepository: DocumentoRepository,
  ) { }

  @get('/documentos/{id}/ratings', {
    responses: {
      '200': {
        description: 'Array of Documento has many Rating',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rating)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Rating>,
  ): Promise<Rating[]> {
    return this.documentoRepository.ratings_documento(id).find(filter);
  }

  @post('/documentos/{id}/ratings', {
    responses: {
      '200': {
        description: 'Documento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rating)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Documento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {
            title: 'NewRatingInDocumento',
            exclude: ['id'],
            optional: ['fk_documento']
          }),
        },
      },
    }) rating: Omit<Rating, 'id'>,
  ): Promise<Rating> {
    return this.documentoRepository.ratings_documento(id).create(rating);
  }

  @patch('/documentos/{id}/ratings', {
    responses: {
      '200': {
        description: 'Documento.Rating PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
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
    return this.documentoRepository.ratings_documento(id).patch(rating, where);
  }

  @del('/documentos/{id}/ratings', {
    responses: {
      '200': {
        description: 'Documento.Rating DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Rating)) where?: Where<Rating>,
  ): Promise<Count> {
    return this.documentoRepository.ratings_documento(id).delete(where);
  }
}
