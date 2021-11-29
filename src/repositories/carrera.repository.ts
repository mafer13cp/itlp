import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ItlpRepoDataSource} from '../datasources';
import {Carrera, CarreraRelations, Usuario, Materia} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {MateriaRepository} from './materia.repository';

export class CarreraRepository extends DefaultCrudRepository<
  Carrera,
  typeof Carrera.prototype.id,
  CarreraRelations
> {

  public readonly usuarios_carrera: HasManyRepositoryFactory<Usuario, typeof Carrera.prototype.id>;

  public readonly materias_carrera: HasManyRepositoryFactory<Materia, typeof Carrera.prototype.id>;

  constructor(
    @inject('datasources.itlpRepo') dataSource: ItlpRepoDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('MateriaRepository') protected materiaRepositoryGetter: Getter<MateriaRepository>,
  ) {
    super(Carrera, dataSource);
    this.materias_carrera = this.createHasManyRepositoryFactoryFor('materias_carrera', materiaRepositoryGetter,);
    this.registerInclusionResolver('materias_carrera', this.materias_carrera.inclusionResolver);
    this.usuarios_carrera = this.createHasManyRepositoryFactoryFor('usuarios_carrera', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios_carrera', this.usuarios_carrera.inclusionResolver);
  }
}
