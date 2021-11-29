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
Tag,
TagDoc,
Documento,
} from '../models';
import {TagRepository} from '../repositories';

export class TagDocumentoController {
  constructor(
    @repository(TagRepository) protected tagRepository: TagRepository,
  ) { }

  @get('/tags/{id}/documentos', {
    responses: {
      '200': {
        description: 'Array of Tag has many Documento through TagDoc',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Documento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Documento>,
  ): Promise<Documento[]> {
    return this.tagRepository.documentos_tag(id).find(filter);
  }

  @post('/tags/{id}/documentos', {
    responses: {
      '200': {
        description: 'create a Documento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Documento)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Tag.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documento, {
            title: 'NewDocumentoInTag',
            exclude: ['id'],
          }),
        },
      },
    }) documento: Omit<Documento, 'id'>,
  ): Promise<Documento> {
    return this.tagRepository.documentos_tag(id).create(documento);
  }

  @patch('/tags/{id}/documentos', {
    responses: {
      '200': {
        description: 'Tag.Documento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documento, {partial: true}),
        },
      },
    })
    documento: Partial<Documento>,
    @param.query.object('where', getWhereSchemaFor(Documento)) where?: Where<Documento>,
  ): Promise<Count> {
    return this.tagRepository.documentos_tag(id).patch(documento, where);
  }

  @del('/tags/{id}/documentos', {
    responses: {
      '200': {
        description: 'Tag.Documento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Documento)) where?: Where<Documento>,
  ): Promise<Count> {
    return this.tagRepository.documentos_tag(id).delete(where);
  }
}
