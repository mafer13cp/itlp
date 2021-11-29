import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ItlpRepoDataSource} from '../datasources';
import {Otros, OtrosRelations, Documento} from '../models';
import {DocumentoRepository} from './documento.repository';

export class OtrosRepository extends DefaultCrudRepository<
  Otros,
  typeof Otros.prototype.id,
  OtrosRelations
> {

  public readonly otro_documento: BelongsToAccessor<Documento, typeof Otros.prototype.id>;

  constructor(
    @inject('datasources.itlpRepo') dataSource: ItlpRepoDataSource, @repository.getter('DocumentoRepository') protected documentoRepositoryGetter: Getter<DocumentoRepository>,
  ) {
    super(Otros, dataSource);
    this.otro_documento = this.createBelongsToAccessorFor('otro_documento', documentoRepositoryGetter,);
    this.registerInclusionResolver('otro_documento', this.otro_documento.inclusionResolver);
  }
}
