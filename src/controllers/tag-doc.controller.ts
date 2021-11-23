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

  @post('/tag-docs')
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
            
          }),
        },
      },
    })
    tagDoc: TagDoc,
  ): Promise<TagDoc> {
    return this.tagDocRepository.create(tagDoc);
  }

  @get('/tag-docs/count')
  @response(200, {
    description: 'TagDoc model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TagDoc) where?: Where<TagDoc>,
  ): Promise<Count> {
    return this.tagDocRepository.count(where);
  }

  @get('/tag-docs')
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

  @patch('/tag-docs')
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

  @get('/tag-docs/{id}')
  @response(200, {
    description: 'TagDoc model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TagDoc, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(TagDoc, {exclude: 'where'}) filter?: FilterExcludingWhere<TagDoc>
  ): Promise<TagDoc> {
    return this.tagDocRepository.findById(id, filter);
  }

  @patch('/tag-docs/{id}')
  @response(204, {
    description: 'TagDoc PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
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

  @put('/tag-docs/{id}')
  @response(204, {
    description: 'TagDoc PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tagDoc: TagDoc,
  ): Promise<void> {
    await this.tagDocRepository.replaceById(id, tagDoc);
  }

  @del('/tag-docs/{id}')
  @response(204, {
    description: 'TagDoc DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tagDocRepository.deleteById(id);
  }
}
