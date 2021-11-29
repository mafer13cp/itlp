import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ItlpRepoDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Rol, Carrera, Comentario, Rating} from '../models';
import {RolRepository} from './rol.repository';
import {CarreraRepository} from './carrera.repository';
import {ComentarioRepository} from './comentario.repository';
import {RatingRepository} from './rating.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly usuario_rol: BelongsToAccessor<Rol, typeof Usuario.prototype.id>;

  public readonly usuario_carrera: BelongsToAccessor<Carrera, typeof Usuario.prototype.id>;

  public readonly comentarios_usuario: HasManyRepositoryFactory<Comentario, typeof Usuario.prototype.id>;

  public readonly ratings_usuario: HasManyRepositoryFactory<Rating, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.itlpRepo') dataSource: ItlpRepoDataSource, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>, @repository.getter('CarreraRepository') protected carreraRepositoryGetter: Getter<CarreraRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>, @repository.getter('RatingRepository') protected ratingRepositoryGetter: Getter<RatingRepository>,
  ) {
    super(Usuario, dataSource);
    this.ratings_usuario = this.createHasManyRepositoryFactoryFor('ratings_usuario', ratingRepositoryGetter,);
    this.registerInclusionResolver('ratings_usuario', this.ratings_usuario.inclusionResolver);
    this.comentarios_usuario = this.createHasManyRepositoryFactoryFor('comentarios_usuario', comentarioRepositoryGetter,);
    this.registerInclusionResolver('comentarios_usuario', this.comentarios_usuario.inclusionResolver);
    this.usuario_carrera = this.createBelongsToAccessorFor('usuario_carrera', carreraRepositoryGetter,);
    this.registerInclusionResolver('usuario_carrera', this.usuario_carrera.inclusionResolver);
    this.usuario_rol = this.createBelongsToAccessorFor('usuario_rol', rolRepositoryGetter,);
    this.registerInclusionResolver('usuario_rol', this.usuario_rol.inclusionResolver);
  }
}
