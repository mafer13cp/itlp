import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {ItlpRepoDataSource} from '../datasources';
import {Tag, TagRelations, Documento, TagDoc} from '../models';
import {TagDocRepository} from './tag-doc.repository';
import {DocumentoRepository} from './documento.repository';

export class TagRepository extends DefaultCrudRepository<
  Tag,
  typeof Tag.prototype.id,
  TagRelations
> {

  public readonly documentos_tag: HasManyThroughRepositoryFactory<Documento, typeof Documento.prototype.id,
          TagDoc,
          typeof Tag.prototype.id
        >;

  constructor(
    @inject('datasources.itlpRepo') dataSource: ItlpRepoDataSource, @repository.getter('TagDocRepository') protected tagDocRepositoryGetter: Getter<TagDocRepository>, @repository.getter('DocumentoRepository') protected documentoRepositoryGetter: Getter<DocumentoRepository>,
  ) {
    super(Tag, dataSource);
    this.documentos_tag = this.createHasManyThroughRepositoryFactoryFor('documentos_tag', documentoRepositoryGetter, tagDocRepositoryGetter,);
    this.registerInclusionResolver('documentos_tag', this.documentos_tag.inclusionResolver);
  }
}
