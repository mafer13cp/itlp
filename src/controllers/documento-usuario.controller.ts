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
Autor,
Usuario,
} from '../models';
import {DocumentoRepository} from '../repositories';

export class DocumentoUsuarioController {
  constructor(
    @repository(DocumentoRepository) protected documentoRepository: DocumentoRepository,
  ) { }

  @get('/documentos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Documento has many Usuario through Autor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.documentoRepository.usuarios_documento(id).find(filter);
  }

  @post('/documentos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'create a Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Documento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInDocumento',
            exclude: ['id'],
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.documentoRepository.usuarios_documento(id).create(usuario);
  }

  @patch('/documentos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Documento.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.documentoRepository.usuarios_documento(id).patch(usuario, where);
  }

  @del('/documentos/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Documento.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.documentoRepository.usuarios_documento(id).delete(where);
  }
}
