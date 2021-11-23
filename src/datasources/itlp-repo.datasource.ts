import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'itlpRepo',
  connector: 'mysql',
  url: '',
  host: 'remotemysql.com',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class ItlpRepoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'itlpRepo';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.itlpRepo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
