import {pool} from './database';
import createTables from './createtables';
import dropTables from './droptables';

const queryTable = () => {
    const populateTable = `${dropTables}${createTables}`;
    pool.query(populateTable)
    .then(() => console.log('table created successfully'))
    .catch((err) => console.log('error', err));
};

queryTable();