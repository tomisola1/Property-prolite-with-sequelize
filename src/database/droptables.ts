const userTable = 'DROP TABLE IF EXISTS users CASCADE;';
const propertyTable = 'DROP TABLE IF EXISTS property CASCADE;';

const dropTables = `${userTable}${propertyTable}`

export default dropTables;