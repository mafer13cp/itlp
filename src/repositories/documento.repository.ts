import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ItlpRepoDataSource} from '../datasources';
import {Documento, DocumentoRelations, Materia, Otros, Comentario, Rating} from '../models';
import {MateriaRepository} from './materia.repository';
import {OtrosRepository} from './otros.repository';
import {ComentarioRepository} from './comentario.repository';
import {RatingRepository} from './rating.repository';

export class DocumentoRepository extends DefaultCrudRepository<
  Documento,
  typeof Documento.prototype.id,
  DocumentoRelations
> {

  public readonly documento_materia: BelongsToAccessor<Materia, typeof Documento.prototype.id>;

  public readonly otros_documento: HasManyRepositoryFactory<Otros, typeof Documento.prototype.id>;

  public readonly comentarios_documento: HasManyRepositoryFactory<Comentario, typeof Documento.prototype.id>;

  public readonly ratings_documento: HasManyRepositoryFactory<Rating, typeof Documento.prototype.id>;

  constructor(
    @inject('datasources.itlpRepo') dataSource: ItlpRepoDataSource, @repository.getter('MateriaRepository') protected materiaRepositoryGetter: Getter<MateriaRepository>, @repository.getter('OtrosRepository') protected otrosRepositoryGetter: Getter<OtrosRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>, @repository.getter('RatingRepository') protected ratingRepositoryGetter: Getter<RatingRepository>,
  ) {
    super(Documento, dataSource);
    this.ratings_documento = this.createHasManyRepositoryFactoryFor('ratings_documento', ratingRepositoryGetter,);
    this.registerInclusionResolver('ratings_documento', this.ratings_documento.inclusionResolver);
    this.comentarios_documento = this.createHasManyRepositoryFactoryFor('comentarios_documento', comentarioRepositoryGetter,);
    this.registerInclusionResolver('comentarios_documento', this.comentarios_documento.inclusionResolver);
    this.otros_documento = this.createHasManyRepositoryFactoryFor('otros_documento', otrosRepositoryGetter,);
    this.registerInclusionResolver('otros_documento', this.otros_documento.inclusionResolver);
    this.documento_materia = this.createBelongsToAccessorFor('documento_materia', materiaRepositoryGetter,);
    this.registerInclusionResolver('documento_materia', this.documento_materia.inclusionResolver);
  }
}
