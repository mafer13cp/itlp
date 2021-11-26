import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ItlpRepoDataSource} from '../datasources';
import {Rating, RatingRelations} from '../models';

export class RatingRepository extends DefaultCrudRepository<
  Rating,
  typeof Rating.prototype.id,
  RatingRelations
> {
  constructor(
    @inject('datasources.itlpRepo') dataSource: ItlpRepoDataSource,
  ) {
    super(Rating, dataSource);
  }
}
