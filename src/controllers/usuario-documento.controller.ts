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
Usuario,
Autor,
Documento,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioDocumentoController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/documentos', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Documento through Autor',
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
    return this.usuarioRepository.documentos_usuario(id).find(filter);
  }

  @post('/usuarios/{id}/documentos', {
    responses: {
      '200': {
        description: 'create a Documento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Documento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Documento, {
            title: 'NewDocumentoInUsuario',
            exclude: ['id'],
          }),
        },
      },
    }) documento: Omit<Documento, 'id'>,
  ): Promise<Documento> {
    return this.usuarioRepository.documentos_usuario(id).create(documento);
  }

  @patch('/usuarios/{id}/documentos', {
    responses: {
      '200': {
        description: 'Usuario.Documento PATCH success count',
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
    return this.usuarioRepository.documentos_usuario(id).patch(documento, where);
  }

  @del('/usuarios/{id}/documentos', {
    responses: {
      '200': {
        description: 'Usuario.Documento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Documento)) where?: Where<Documento>,
  ): Promise<Count> {
    return this.usuarioRepository.documentos_usuario(id).delete(where);
  }
}
