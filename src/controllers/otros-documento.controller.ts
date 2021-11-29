import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Otros,
  Documento,
} from '../models';
import {OtrosRepository} from '../repositories';

export class OtrosDocumentoController {
  constructor(
    @repository(OtrosRepository)
    public otrosRepository: OtrosRepository,
  ) { }

  @get('/otros/{id}/documento', {
    responses: {
      '200': {
        description: 'Documento belonging to Otros',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Documento)},
          },
        },
      },
    },
  })
  async getDocumento(
    @param.path.number('id') id: typeof Otros.prototype.id,
  ): Promise<Documento> {
    return this.otrosRepository.otro_documento(id);
  }
}
