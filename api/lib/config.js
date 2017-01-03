const env = process.env;

module.exports.config = {
  user: env.PGUSER,
  database: env.PGDATABASE,
  password: env.PGPASSWORD,
  host: env.PGHOST,
  port: env.PGPORT,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

module.exports.errors = {
  'DATABASE_ERROR': 'Error while fetching the database, please try again later',
  'ARGUMENT_MISSING': 'A required argument is missing.'
};
