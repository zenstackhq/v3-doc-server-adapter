import { SqlJsDialect } from '@zenstackhq/kysely-sql-js';
import { ZenStackClient } from '@zenstackhq/orm';
import { PolicyPlugin } from '@zenstackhq/plugin-policy';
import initSqlJs from 'sql.js';
import { createUsersAndPosts } from './utils';
import { schema } from './zenstack/schema';

export async function createClient() {
  // initialize sql.js engine
  const SQL = await initSqlJs();

  // create database client with sql.js dialect
  const db = new ZenStackClient(schema, {
    dialect: new SqlJsDialect({ sqlJs: new SQL.Database() }),
  });

  // push schema to the database
  // the `$pushSchema` API is for testing purposes only
  await db.$pushSchema();

  // create a few test users and posts
  await createUsersAndPosts(db);

  // install policy plugin
  return db.$use(new PolicyPlugin());
}
