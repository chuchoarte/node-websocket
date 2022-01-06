const db = require('mongoose');

db.Promise = global.Promise;
//const DB_URI = ``;
const connect = async url => {
    await db.connect(url);
    console.log('[db] Connect success.');
}

module.exports = connect;