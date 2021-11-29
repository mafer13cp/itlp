import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Comentario,
  Documento,
} from '../models';
import {ComentarioRepository} from '../repositories';

export class ComentarioDocumentoController {
  constructor(
    @repository(ComentarioRepository)
    public comentarioRepository: ComentarioRepository,
  ) { }

  @get('/comentarios/{id}/documento', {
    responses: {
      '200': {
        description: 'Documento belonging to Comentario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Documento)},
          },
        },
      },
    },
  })
  async getDocumento(
    @param.path.number('id') id: typeof Comentario.prototype.id,
  ): Promise<Documento> {
    return this.comentarioRepository.comentario_documento(id);
  }
}
