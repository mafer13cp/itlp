import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuario,
  Carrera,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioCarreraController {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/carrera', {
    responses: {
      '200': {
        description: 'Carrera belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Carrera)},
          },
        },
      },
    },
  })
  async getCarrera(
    @param.path.string('id') id: typeof Usuario.prototype.id,
  ): Promise<Carrera> {
    return this.usuarioRepository.usuario_carrera(id);
  }
}
