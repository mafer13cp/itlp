import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ItlpRepoDataSource} from '../datasources';
import {TagDoc, TagDocRelations} from '../models';

export class TagDocRepository extends DefaultCrudRepository<
  TagDoc,
  typeof TagDoc.prototype.id,
  TagDocRelations
> {
  constructor(
    @inject('datasources.itlpRepo') dataSource: ItlpRepoDataSource,
  ) {
    super(TagDoc, dataSource);
  }
}
