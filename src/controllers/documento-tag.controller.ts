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
TagDoc,
Tag,
} from '../models';
import {DocumentoRepository} from '../repositories';

export class DocumentoTagController {
  constructor(
    @repository(DocumentoRepository) protected documentoRepository: DocumentoRepository,
  ) { }

  @get('/documentos/{id}/tags', {
    responses: {
      '200': {
        description: 'Array of Documento has many Tag through TagDoc',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tag)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tag>,
  ): Promise<Tag[]> {
    return this.documentoRepository.tags_documento(id).find(filter);
  }

  @post('/documentos/{id}/tags', {
    responses: {
      '200': {
        description: 'create a Tag model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tag)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Documento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tag, {
            title: 'NewTagInDocumento',
            exclude: ['id'],
          }),
        },
      },
    }) tag: Omit<Tag, 'id'>,
  ): Promise<Tag> {
    return this.documentoRepository.tags_documento(id).create(tag);
  }

  @patch('/documentos/{id}/tags', {
    responses: {
      '200': {
        description: 'Documento.Tag PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tag, {partial: true}),
        },
      },
    })
    tag: Partial<Tag>,
    @param.query.object('where', getWhereSchemaFor(Tag)) where?: Where<Tag>,
  ): Promise<Count> {
    return this.documentoRepository.tags_documento(id).patch(tag, where);
  }

  @del('/documentos/{id}/tags', {
    responses: {
      '200': {
        description: 'Documento.Tag DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tag)) where?: Where<Tag>,
  ): Promise<Count> {
    return this.documentoRepository.tags_documento(id).delete(where);
  }
}
