import { MySqlContainer } from '@testcontainers/mysql';

export default async function mysqlTestContainer() {
  const mysqlContainer = await new MySqlContainer().start();

  const host = mysqlContainer.getHost();
  const port = mysqlContainer.getPort();
  const username = mysqlContainer.getUsername();
  const password = mysqlContainer.getRootPassword();
  const database = mysqlContainer.getDatabase();

  return {
    host,
    port,
    username,
    password,
    database,
  };
}

