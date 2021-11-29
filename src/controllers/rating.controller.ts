import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Rating} from '../models';
import {RatingRepository} from '../repositories';

export class RatingController {
  constructor(
    @repository(RatingRepository)
    public ratingRepository : RatingRepository,
  ) {}

  @post('/ratings')
  @response(200, {
    description: 'Rating model instance',
    content: {'application/json': {schema: getModelSchemaRef(Rating)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {
            title: 'NewRating',
            exclude: ['id'],
          }),
        },
      },
    })
    rating: Omit<Rating, 'id'>,
  ): Promise<Rating> {
    return this.ratingRepository.create(rating);
  }

  @get('/ratings/count')
  @response(200, {
    description: 'Rating model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Rating) where?: Where<Rating>,
  ): Promise<Count> {
    return this.ratingRepository.count(where);
  }

  @get('/ratings')
  @response(200, {
    description: 'Array of Rating model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Rating, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Rating) filter?: Filter<Rating>,
  ): Promise<Rating[]> {
    return this.ratingRepository.find(filter);
  }

  @patch('/ratings')
  @response(200, {
    description: 'Rating PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {partial: true}),
        },
      },
    })
    rating: Rating,
    @param.where(Rating) where?: Where<Rating>,
  ): Promise<Count> {
    return this.ratingRepository.updateAll(rating, where);
  }

  @get('/ratings/{id}')
  @response(200, {
    description: 'Rating model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Rating, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Rating, {exclude: 'where'}) filter?: FilterExcludingWhere<Rating>
  ): Promise<Rating> {
    return this.ratingRepository.findById(id, filter);
  }

  @patch('/ratings/{id}')
  @response(204, {
    description: 'Rating PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rating, {partial: true}),
        },
      },
    })
    rating: Rating,
  ): Promise<void> {
    await this.ratingRepository.updateById(id, rating);
  }

  @put('/ratings/{id}')
  @response(204, {
    description: 'Rating PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() rating: Rating,
  ): Promise<void> {
    await this.ratingRepository.replaceById(id, rating);
  }

  @del('/ratings/{id}')
  @response(204, {
    description: 'Rating DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ratingRepository.deleteById(id);
  }
}
