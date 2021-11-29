import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Documento,
  Materia,
} from '../models';
import {DocumentoRepository} from '../repositories';

export class DocumentoMateriaController {
  constructor(
    @repository(DocumentoRepository)
    public documentoRepository: DocumentoRepository,
  ) { }

  @get('/documentos/{id}/materia', {
    responses: {
      '200': {
        description: 'Materia belonging to Documento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Materia)},
          },
        },
      },
    },
  })
  async getMateria(
    @param.path.number('id') id: typeof Documento.prototype.id,
  ): Promise<Materia> {
    return this.documentoRepository.documento_materia(id);
  }
}
