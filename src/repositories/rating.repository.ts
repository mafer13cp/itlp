import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ItlpRepoDataSource} from '../datasources';
import {Rating, RatingRelations, Documento, Usuario} from '../models';
import {DocumentoRepository} from './documento.repository';
import {UsuarioRepository} from './usuario.repository';

export class RatingRepository extends DefaultCrudRepository<
  Rating,
  typeof Rating.prototype.id,
  RatingRelations
> {

  public readonly rating_documento: BelongsToAccessor<Documento, typeof Rating.prototype.id>;

  public readonly rating_usuario: BelongsToAccessor<Usuario, typeof Rating.prototype.id>;

  constructor(
    @inject('datasources.itlpRepo') dataSource: ItlpRepoDataSource, @repository.getter('DocumentoRepository') protected documentoRepositoryGetter: Getter<DocumentoRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Rating, dataSource);
    this.rating_usuario = this.createBelongsToAccessorFor('rating_usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('rating_usuario', this.rating_usuario.inclusionResolver);
    this.rating_documento = this.createBelongsToAccessorFor('rating_documento', documentoRepositoryGetter,);
    this.registerInclusionResolver('rating_documento', this.rating_documento.inclusionResolver);
  }
}
