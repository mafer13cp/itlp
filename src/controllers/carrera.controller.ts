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
import {Carrera} from '../models';
import {CarreraRepository} from '../repositories';

export class CarreraController {
  constructor(
    @repository(CarreraRepository)
    public carreraRepository : CarreraRepository,
  ) {}

  @post('/carreras')
  @response(200, {
    description: 'Carrera model instance',
    content: {'application/json': {schema: getModelSchemaRef(Carrera)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carrera, {
            title: 'NewCarrera',
            
          }),
        },
      },
    })
    carrera: Carrera,
  ): Promise<Carrera> {
    return this.carreraRepository.create(carrera);
  }

  @get('/carreras/count')
  @response(200, {
    description: 'Carrera model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Carrera) where?: Where<Carrera>,
  ): Promise<Count> {
    return this.carreraRepository.count(where);
  }

  @get('/carreras')
  @response(200, {
    description: 'Array of Carrera model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Carrera, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Carrera) filter?: Filter<Carrera>,
  ): Promise<Carrera[]> {
    return this.carreraRepository.find(filter);
  }

  @patch('/carreras')
  @response(200, {
    description: 'Carrera PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carrera, {partial: true}),
        },
      },
    })
    carrera: Carrera,
    @param.where(Carrera) where?: Where<Carrera>,
  ): Promise<Count> {
    return this.carreraRepository.updateAll(carrera, where);
  }

  @get('/carreras/{id}')
  @response(200, {
    description: 'Carrera model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Carrera, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Carrera, {exclude: 'where'}) filter?: FilterExcludingWhere<Carrera>
  ): Promise<Carrera> {
    return this.carreraRepository.findById(id, filter);
  }

  @patch('/carreras/{id}')
  @response(204, {
    description: 'Carrera PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Carrera, {partial: true}),
        },
      },
    })
    carrera: Carrera,
  ): Promise<void> {
    await this.carreraRepository.updateById(id, carrera);
  }

  @put('/carreras/{id}')
  @response(204, {
    description: 'Carrera PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() carrera: Carrera,
  ): Promise<void> {
    await this.carreraRepository.replaceById(id, carrera);
  }

  @del('/carreras/{id}')
  @response(204, {
    description: 'Carrera DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.carreraRepository.deleteById(id);
  }
}
