const express = require('express');
const router = express.Router();
const {setSuccess, setError} = require('../../network/response');
const {add, list} = require('./controller');

router.get('/', (req, res) => {
    const {name} = req.query || null;
    const filter = name;
    list(filter)
    .then(user => {
        setSuccess(req, res, user, 200);
    })
    .catch(error => {
        console.log(error);
        setError(req, res, error, 400);
    });
});

router.post('/', (req, res) => { 
    const {name} = req.body; 
    add(name).then(data => {
        setSuccess(req, res, data, 201);
    })
    .catch(err => {
        setError(req, res, 'Internal error', 500, err);
    });
});

module.exports = router;