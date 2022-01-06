const express = require('express');
const multer = require('multer');
const router = express.Router();
const {filesRoute} = require('../../config');
const {setSuccess, setError} = require('../../network/response');
const {addMessage, getMessages, updateMessage, deleteMessage} = require('./controller');

const upload = multer({
    dest: `public/${filesRoute}/`
});

router.get('/', (req, res) => {
    const {user} = req.query || null;
    const filterMessages = user;
    getMessages(filterMessages)
    .then(messages => {
        setSuccess(req, res, messages, 200);
    })
    .catch(error => {
        console.log(error);
        setError(req, res, error, 400);
    });
});

router.post('/', upload.single('file'), (req, res) => {
    const {file} = req;
    const {chat, user, message} = req.body;
    addMessage(chat, user, message, file)
    .then(message => {
        setSuccess(req, res, message, 201);
    })
    .catch(error => {
        setError(req, res, error, 400);
    });
});

router.patch('/:id', (req, res) => {
    const {id} = req.params;
    const {message} = req.body;
    updateMessage(id, message)
    .then(data => {
        setSuccess(req, res, data);
    }).catch(error => {
        setError(req, res, error, 500);
    });
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    deleteMessage(id)
    .then(() => {
        setSuccess(req, res, `User ${id} deleted.`);
    }).catch(error => {
        setError(req, res, 'Inter error', 500, error);
    });
});

module.exports = router;