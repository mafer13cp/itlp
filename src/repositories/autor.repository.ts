import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ItlpRepoDataSource} from '../datasources';
import {Autor, AutorRelations} from '../models';

export class AutorRepository extends DefaultCrudRepository<
  Autor,
  typeof Autor.prototype.id,
  AutorRelations
> {
  constructor(
    @inject('datasources.itlpRepo') dataSource: ItlpRepoDataSource,
  ) {
    super(Autor, dataSource);
  }
}
