require('dotenv').config();
const {PORT, DB_HOST, HOST, PUBLIC_ROUTE, FILES_ROUTE} = process.env;

const config = {
    dbUrl: DB_HOST,
    port: PORT || '4000',
    host: HOST || `http://localhost`,
    publicRoute: PUBLIC_ROUTE || '/app',
    filesRoute: FILES_ROUTE || 'files'
}

module.exports = config;