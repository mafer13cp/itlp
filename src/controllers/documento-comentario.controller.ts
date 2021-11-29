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
  Documento,
  Comentario,
} from '../models';
import {DocumentoRepository} from '../repositories';

export class DocumentoComentarioController {
  constructor(
    @repository(DocumentoRepository) protected documentoRepository: DocumentoRepository,
  ) { }

  @get('/documentos/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Array of Documento has many Comentario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comentario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Comentario>,
  ): Promise<Comentario[]> {
    return this.documentoRepository.comentarios_documento(id).find(filter);
  }

  @post('/documentos/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Documento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comentario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Documento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {
            title: 'NewComentarioInDocumento',
            exclude: ['id'],
            optional: ['fk_documento']
          }),
        },
      },
    }) comentario: Omit<Comentario, 'id'>,
  ): Promise<Comentario> {
    return this.documentoRepository.comentarios_documento(id).create(comentario);
  }

  @patch('/documentos/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Documento.Comentario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {partial: true}),
        },
      },
    })
    comentario: Partial<Comentario>,
    @param.query.object('where', getWhereSchemaFor(Comentario)) where?: Where<Comentario>,
  ): Promise<Count> {
    return this.documentoRepository.comentarios_documento(id).patch(comentario, where);
  }

  @del('/documentos/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Documento.Comentario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Comentario)) where?: Where<Comentario>,
  ): Promise<Count> {
    return this.documentoRepository.comentarios_documento(id).delete(where);
  }
}
