import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');  // Utilisation de postgres par défaut

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          key: env('DATABASE_SSL_KEY', undefined),
          cert: env('DATABASE_SSL_CERT', undefined),
          ca: env('DATABASE_SSL_CA', undefined),
          capath: env('DATABASE_SSL_CAPATH', undefined),
          cipher: env('DATABASE_SSL_CIPHER', undefined),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        },
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    postgres: {
      connection: {
        host: env('DATABASE_HOST', 'dpg-cu6aeqbtq21c7385t3cg-a'),  // Utiliser l'hôte de la base de données PostgreSQL
        port: env.int('DATABASE_PORT', 5432),  // Port par défaut pour PostgreSQL
        database: env('DATABASE_NAME', 'rose_database'),  // Nom de la base de données
        user: env('DATABASE_USERNAME', 'rose_database_user'),  // Nom d'utilisateur
        password: env('DATABASE_PASSWORD', 'HAtwnaXs8vV51Z049ySKAnLbPORJTeYV'),  // Mot de passe
        ssl: env.bool('DATABASE_SSL', true) && {  // Utilisation du SSL pour la connexion
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
        },
        schema: env('DATABASE_SCHEMA', 'public'),  // Utilisation du schéma 'public' par défaut
      },
      pool: { min: env.int('DATABASE_POOL_MIN', 2), max: env.int('DATABASE_POOL_MAX', 10) },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
