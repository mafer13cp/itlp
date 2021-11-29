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
import {TagDoc} from '../models';
import {TagDocRepository} from '../repositories';

export class TagDocController {
  constructor(
    @repository(TagDocRepository)
    public tagDocRepository : TagDocRepository,
  ) {}

  @post('/tagDocs')
  @response(200, {
    description: 'TagDoc model instance',
    content: {'application/json': {schema: getModelSchemaRef(TagDoc)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TagDoc, {
            title: 'NewTagDoc',
            exclude: ['id'],
          }),
        },
      },
    })
    tagDoc: Omit<TagDoc, 'id'>,
  ): Promise<TagDoc> {
    return this.tagDocRepository.create(tagDoc);
  }

  @get('/tagDocs/count')
  @response(200, {
    description: 'TagDoc model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TagDoc) where?: Where<TagDoc>,
  ): Promise<Count> {
    return this.tagDocRepository.count(where);
  }

  @get('/tagDocs')
  @response(200, {
    description: 'Array of TagDoc model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TagDoc, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TagDoc) filter?: Filter<TagDoc>,
  ): Promise<TagDoc[]> {
    return this.tagDocRepository.find(filter);
  }

  @patch('/tagDocs')
  @response(200, {
    description: 'TagDoc PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TagDoc, {partial: true}),
        },
      },
    })
    tagDoc: TagDoc,
    @param.where(TagDoc) where?: Where<TagDoc>,
  ): Promise<Count> {
    return this.tagDocRepository.updateAll(tagDoc, where);
  }

  @get('/tagDocs/{id}')
  @response(200, {
    description: 'TagDoc model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TagDoc, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TagDoc, {exclude: 'where'}) filter?: FilterExcludingWhere<TagDoc>
  ): Promise<TagDoc> {
    return this.tagDocRepository.findById(id, filter);
  }

  @patch('/tagDocs/{id}')
  @response(204, {
    description: 'TagDoc PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TagDoc, {partial: true}),
        },
      },
    })
    tagDoc: TagDoc,
  ): Promise<void> {
    await this.tagDocRepository.updateById(id, tagDoc);
  }

  @put('/tagDocs/{id}')
  @response(204, {
    description: 'TagDoc PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tagDoc: TagDoc,
  ): Promise<void> {
    await this.tagDocRepository.replaceById(id, tagDoc);
  }

  @del('/tagDocs/{id}')
  @response(204, {
    description: 'TagDoc DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tagDocRepository.deleteById(id);
  }
}
