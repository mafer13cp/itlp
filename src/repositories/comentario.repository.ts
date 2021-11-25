import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ItlpRepoDataSource} from '../datasources';
import {Comentario, ComentarioRelations} from '../models';

export class ComentarioRepository extends DefaultCrudRepository<
  Comentario,
  typeof Comentario.prototype.id,
  ComentarioRelations
> {
  constructor(
    @inject('datasources.itlpRepo') dataSource: ItlpRepoDataSource,
  ) {
    super(Comentario, dataSource);
  }
}
