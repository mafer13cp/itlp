import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ItlpRepoDataSource} from '../datasources';
import {Comentario, ComentarioRelations, Documento, Usuario} from '../models';
import {DocumentoRepository} from './documento.repository';
import {UsuarioRepository} from './usuario.repository';

export class ComentarioRepository extends DefaultCrudRepository<
  Comentario,
  typeof Comentario.prototype.id,
  ComentarioRelations
> {

  public readonly comentario_documento: BelongsToAccessor<Documento, typeof Comentario.prototype.id>;

  public readonly comentario_usuario: BelongsToAccessor<Usuario, typeof Comentario.prototype.id>;

  constructor(
    @inject('datasources.itlpRepo') dataSource: ItlpRepoDataSource, @repository.getter('DocumentoRepository') protected documentoRepositoryGetter: Getter<DocumentoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Comentario, dataSource);
    this.comentario_usuario = this.createBelongsToAccessorFor('comentario_usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('comentario_usuario', this.comentario_usuario.inclusionResolver);
    this.comentario_documento = this.createBelongsToAccessorFor('comentario_documento', documentoRepositoryGetter,);
    this.registerInclusionResolver('comentario_documento', this.comentario_documento.inclusionResolver);
  }
}
