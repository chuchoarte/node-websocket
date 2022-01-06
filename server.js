const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);

const {dbUrl, port, host, publicRoute} = require('./config');
const {connect} = require('./socket');
const db = require('./db');
const router = require('./network/routes');

db(dbUrl);
app.use(express.json());
app.use(cors());
connect(server); 
router(app);

app.use(publicRoute, express.static('public'));

server.listen(port, () => console.log(`Listen to on port: ${host}:${port}`));