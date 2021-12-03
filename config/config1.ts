// {
//   "development": {
//     "username": "root",
//     "password": null,
//     "database": "database_development",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }

const {Sequelize} = require('sequelize')

let isTestEnv = process.env.NODE_ENV === "test"
const db = new Sequelize(isTestEnv ? 'kobodb_sequelize_test':'kobodb_sequelize', 'postgres', 'postgres', {
    host: 'localhost',
    port:'5433',
    dialect: 'postgres'
});


export default db
