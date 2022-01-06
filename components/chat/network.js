const express = require('express');
const router = express.Router();
const {setSuccess, setError} = require('../../network/response');
const {add, list} = require('./controller');

router.post('/', (req, res) => {
    const {users} = req.body;
    add(users).then(data => {
        setSuccess(req, res, data, 201);
    })
    .catch(err => {
        setError(req, res, 'Internal error ', 500, err);
    });
});

router.get('/iserId', (req, res) => {
    const {userId} = req.params;
    list(userId).then(users => {
        setSuccess(req, res, users, 200);
    })
    .catch(err => {
        setError(req, res, 'Internal error ', 500, err)
    });
});