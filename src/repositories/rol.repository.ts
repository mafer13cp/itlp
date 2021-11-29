import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ItlpRepoDataSource} from '../datasources';
import {Rol, RolRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly usuarios_rol: HasManyRepositoryFactory<Usuario, typeof Rol.prototype.id>;

  constructor(
    @inject('datasources.itlpRepo') dataSource: ItlpRepoDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Rol, dataSource);
    this.usuarios_rol = this.createHasManyRepositoryFactoryFor('usuarios_rol', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios_rol', this.usuarios_rol.inclusionResolver);
  }
}
