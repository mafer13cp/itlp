import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ItlpRepoDataSource} from '../datasources';
import {Materia, MateriaRelations, Carrera, Documento} from '../models';
import {CarreraRepository} from './carrera.repository';
import {DocumentoRepository} from './documento.repository';

export class MateriaRepository extends DefaultCrudRepository<
  Materia,
  typeof Materia.prototype.id,
  MateriaRelations
> {

  public readonly materia_carrera: BelongsToAccessor<Carrera, typeof Materia.prototype.id>;

  public readonly documentos_materia: HasManyRepositoryFactory<Documento, typeof Materia.prototype.id>;

  constructor(
    @inject('datasources.itlpRepo') dataSource: ItlpRepoDataSource, @repository.getter('CarreraRepository') protected carreraRepositoryGetter: Getter<CarreraRepository>, @repository.getter('DocumentoRepository') protected documentoRepositoryGetter: Getter<DocumentoRepository>,
  ) {
    super(Materia, dataSource);
    this.documentos_materia = this.createHasManyRepositoryFactoryFor('documentos_materia', documentoRepositoryGetter,);
    this.registerInclusionResolver('documentos_materia', this.documentos_materia.inclusionResolver);
    this.materia_carrera = this.createBelongsToAccessorFor('materia_carrera', carreraRepositoryGetter,);
    this.registerInclusionResolver('materia_carrera', this.materia_carrera.inclusionResolver);
  }
}
