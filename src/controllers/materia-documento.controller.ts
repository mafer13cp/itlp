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
  Materia,
  Documento,
} from '../models';
import {MateriaRepository} from '../repositories';

export class MateriaDocumentoController {
  constructor(
    @repository(MateriaRepository) protected materiaRepository: MateriaRepository,
  ) { }

  @get('/materias/{id}/documentos', {
    responses: {
      '200': {
        description: 'Array of Materia has many Documento',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Documento)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Documento>,
  ): Promise<Documento[]> {
    return this.materiaRepository.documentos_materia(id).find(filter);
  }

  @post('/materias/{id}/documentos', {
    responses: {
      '200': {
        description: 'Materia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Documento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Materia.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documento, {
            title: 'NewDocumentoInMateria',
            exclude: ['id'],
            optional: ['fk_materia']
          }),
        },
      },
    }) documento: Omit<Documento, 'id'>,
  ): Promise<Documento> {
    return this.materiaRepository.documentos_materia(id).create(documento);
  }

  @patch('/materias/{id}/documentos', {
    responses: {
      '200': {
        description: 'Materia.Documento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
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
    return this.materiaRepository.documentos_materia(id).patch(documento, where);
  }

  @del('/materias/{id}/documentos', {
    responses: {
      '200': {
        description: 'Materia.Documento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Documento)) where?: Where<Documento>,
  ): Promise<Count> {
    return this.materiaRepository.documentos_materia(id).delete(where);
  }
}
