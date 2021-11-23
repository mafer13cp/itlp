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
import {Materia} from '../models';
import {MateriaRepository} from '../repositories';

export class MateriaController {
  constructor(
    @repository(MateriaRepository)
    public materiaRepository : MateriaRepository,
  ) {}

  @post('/materias')
  @response(200, {
    description: 'Materia model instance',
    content: {'application/json': {schema: getModelSchemaRef(Materia)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Materia, {
            title: 'NewMateria',
            
          }),
        },
      },
    })
    materia: Materia,
  ): Promise<Materia> {
    return this.materiaRepository.create(materia);
  }

  @get('/materias/count')
  @response(200, {
    description: 'Materia model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Materia) where?: Where<Materia>,
  ): Promise<Count> {
    return this.materiaRepository.count(where);
  }

  @get('/materias')
  @response(200, {
    description: 'Array of Materia model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Materia, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Materia) filter?: Filter<Materia>,
  ): Promise<Materia[]> {
    return this.materiaRepository.find(filter);
  }

  @patch('/materias')
  @response(200, {
    description: 'Materia PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Materia, {partial: true}),
        },
      },
    })
    materia: Materia,
    @param.where(Materia) where?: Where<Materia>,
  ): Promise<Count> {
    return this.materiaRepository.updateAll(materia, where);
  }

  @get('/materias/{id}')
  @response(200, {
    description: 'Materia model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Materia, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Materia, {exclude: 'where'}) filter?: FilterExcludingWhere<Materia>
  ): Promise<Materia> {
    return this.materiaRepository.findById(id, filter);
  }

  @patch('/materias/{id}')
  @response(204, {
    description: 'Materia PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Materia, {partial: true}),
        },
      },
    })
    materia: Materia,
  ): Promise<void> {
    await this.materiaRepository.updateById(id, materia);
  }

  @put('/materias/{id}')
  @response(204, {
    description: 'Materia PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() materia: Materia,
  ): Promise<void> {
    await this.materiaRepository.replaceById(id, materia);
  }

  @del('/materias/{id}')
  @response(204, {
    description: 'Materia DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.materiaRepository.deleteById(id);
  }
}
