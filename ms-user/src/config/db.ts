const productConfig = {
  mysql: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'hm1234',
    database: 'nest_ms',
    connectionLimit: 10,
  },
};

const localConfig = {
  mysql: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'hm1234',
    database: 'nest_ms',
    connectionLimit: 10,
  },
};

const dbConfig = process.env.NODE_ENV ? productConfig : localConfig;

export default dbConfig;
