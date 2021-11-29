import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Materia,
  Carrera,
} from '../models';
import {MateriaRepository} from '../repositories';

export class MateriaCarreraController {
  constructor(
    @repository(MateriaRepository)
    public materiaRepository: MateriaRepository,
  ) { }

  @get('/materias/{id}/carrera', {
    responses: {
      '200': {
        description: 'Carrera belonging to Materia',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Carrera)},
          },
        },
      },
    },
  })
  async getCarrera(
    @param.path.string('id') id: typeof Materia.prototype.id,
  ): Promise<Carrera> {
    return this.materiaRepository.materia_carrera(id);
  }
}
