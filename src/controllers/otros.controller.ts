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
import {Otros} from '../models';
import {OtrosRepository} from '../repositories';

export class OtrosController {
  constructor(
    @repository(OtrosRepository)
    public otrosRepository : OtrosRepository,
  ) {}

  @post('/otros')
  @response(200, {
    description: 'Otros model instance',
    content: {'application/json': {schema: getModelSchemaRef(Otros)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Otros, {
            title: 'NewOtros',
            exclude: ['id'],
          }),
        },
      },
    })
    otros: Omit<Otros, 'id'>,
  ): Promise<Otros> {
    return this.otrosRepository.create(otros);
  }

  @get('/otros/count')
  @response(200, {
    description: 'Otros model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Otros) where?: Where<Otros>,
  ): Promise<Count> {
    return this.otrosRepository.count(where);
  }

  @get('/otros')
  @response(200, {
    description: 'Array of Otros model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Otros, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Otros) filter?: Filter<Otros>,
  ): Promise<Otros[]> {
    return this.otrosRepository.find(filter);
  }

  @patch('/otros')
  @response(200, {
    description: 'Otros PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Otros, {partial: true}),
        },
      },
    })
    otros: Otros,
    @param.where(Otros) where?: Where<Otros>,
  ): Promise<Count> {
    return this.otrosRepository.updateAll(otros, where);
  }

  @get('/otros/{id}')
  @response(200, {
    description: 'Otros model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Otros, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Otros, {exclude: 'where'}) filter?: FilterExcludingWhere<Otros>
  ): Promise<Otros> {
    return this.otrosRepository.findById(id, filter);
  }

  @patch('/otros/{id}')
  @response(204, {
    description: 'Otros PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Otros, {partial: true}),
        },
      },
    })
    otros: Otros,
  ): Promise<void> {
    await this.otrosRepository.updateById(id, otros);
  }

  @put('/otros/{id}')
  @response(204, {
    description: 'Otros PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() otros: Otros,
  ): Promise<void> {
    await this.otrosRepository.replaceById(id, otros);
  }

  @del('/otros/{id}')
  @response(204, {
    description: 'Otros DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.otrosRepository.deleteById(id);
  }
}
