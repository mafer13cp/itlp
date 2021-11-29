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
  Materia,
} from '../models';
import {CarreraRepository} from '../repositories';

export class CarreraMateriaController {
  constructor(
    @repository(CarreraRepository) protected carreraRepository: CarreraRepository,
  ) { }

  @get('/carreras/{id}/materias', {
    responses: {
      '200': {
        description: 'Array of Carrera has many Materia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Materia)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Materia>,
  ): Promise<Materia[]> {
    return this.carreraRepository.materias_carrera(id).find(filter);
  }

  @post('/carreras/{id}/materias', {
    responses: {
      '200': {
        description: 'Carrera model instance',
        content: {'application/json': {schema: getModelSchemaRef(Materia)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Carrera.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Materia, {
            title: 'NewMateriaInCarrera',
            exclude: ['id'],
            optional: ['fk_carrera']
          }),
        },
      },
    }) materia: Omit<Materia, 'id'>,
  ): Promise<Materia> {
    return this.carreraRepository.materias_carrera(id).create(materia);
  }

  @patch('/carreras/{id}/materias', {
    responses: {
      '200': {
        description: 'Carrera.Materia PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Materia, {partial: true}),
        },
      },
    })
    materia: Partial<Materia>,
    @param.query.object('where', getWhereSchemaFor(Materia)) where?: Where<Materia>,
  ): Promise<Count> {
    return this.carreraRepository.materias_carrera(id).patch(materia, where);
  }

  @del('/carreras/{id}/materias', {
    responses: {
      '200': {
        description: 'Carrera.Materia DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Materia)) where?: Where<Materia>,
  ): Promise<Count> {
    return this.carreraRepository.materias_carrera(id).delete(where);
  }
}
