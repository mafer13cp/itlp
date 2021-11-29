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
  Otros,
} from '../models';
import {DocumentoRepository} from '../repositories';

export class DocumentoOtrosController {
  constructor(
    @repository(DocumentoRepository) protected documentoRepository: DocumentoRepository,
  ) { }

  @get('/documentos/{id}/otros', {
    responses: {
      '200': {
        description: 'Array of Documento has many Otros',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Otros)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Otros>,
  ): Promise<Otros[]> {
    return this.documentoRepository.otros_documento(id).find(filter);
  }

  @post('/documentos/{id}/otros', {
    responses: {
      '200': {
        description: 'Documento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Otros)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Documento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Otros, {
            title: 'NewOtrosInDocumento',
            exclude: ['id'],
            optional: ['fk_documento']
          }),
        },
      },
    }) otros: Omit<Otros, 'id'>,
  ): Promise<Otros> {
    return this.documentoRepository.otros_documento(id).create(otros);
  }

  @patch('/documentos/{id}/otros', {
    responses: {
      '200': {
        description: 'Documento.Otros PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Otros, {partial: true}),
        },
      },
    })
    otros: Partial<Otros>,
    @param.query.object('where', getWhereSchemaFor(Otros)) where?: Where<Otros>,
  ): Promise<Count> {
    return this.documentoRepository.otros_documento(id).patch(otros, where);
  }

  @del('/documentos/{id}/otros', {
    responses: {
      '200': {
        description: 'Documento.Otros DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Otros)) where?: Where<Otros>,
  ): Promise<Count> {
    return this.documentoRepository.otros_documento(id).delete(where);
  }
}
