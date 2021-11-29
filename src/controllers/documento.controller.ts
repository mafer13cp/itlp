import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Documento} from '../models';
import {DocumentoRepository} from '../repositories';

export class DocumentoController {
  constructor(
    @repository(DocumentoRepository)
    public documentoRepository : DocumentoRepository,
  ) {}

  @post('/documentos')
  @response(200, {
    description: 'Documento model instance',
    content: {'application/json': {schema: getModelSchemaRef(Documento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documento, {
            title: 'NewDocumento',
            exclude: ['id'],
          }),
        },
      },
    })
    documento: Omit<Documento, 'id'>,
  ): Promise<Documento> {
    return this.documentoRepository.create(documento);
  }

  @get('/documentos/count')
  @response(200, {
    description: 'Documento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Documento) where?: Where<Documento>,
  ): Promise<Count> {
    return this.documentoRepository.count(where);
  }

  @get('/documentos')
  @response(200, {
    description: 'Array of Documento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Documento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Documento) filter?: Filter<Documento>,
  ): Promise<Documento[]> {
    return this.documentoRepository.find(filter);
  }

  @patch('/documentos')
  @response(200, {
    description: 'Documento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documento, {partial: true}),
        },
      },
    })
    documento: Documento,
    @param.where(Documento) where?: Where<Documento>,
  ): Promise<Count> {
    return this.documentoRepository.updateAll(documento, where);
  }

  @get('/documentos/{id}')
  @response(200, {
    description: 'Documento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Documento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Documento, {exclude: 'where'}) filter?: FilterExcludingWhere<Documento>
  ): Promise<Documento> {
    return this.documentoRepository.findById(id, filter);
  }

  @patch('/documentos/{id}')
  @response(204, {
    description: 'Documento PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documento, {partial: true}),
        },
      },
    })
    documento: Documento,
  ): Promise<void> {
    await this.documentoRepository.updateById(id, documento);
  }

  @put('/documentos/{id}')
  @response(204, {
    description: 'Documento PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() documento: Documento,
  ): Promise<void> {
    await this.documentoRepository.replaceById(id, documento);
  }

  @del('/documentos/{id}')
  @response(204, {
    description: 'Documento DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.documentoRepository.deleteById(id);
  }
}
