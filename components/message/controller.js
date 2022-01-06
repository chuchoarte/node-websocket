const {host, port, filesRoute} = require('../../config');
const { socket } = require('../../socket');
const {add, list, updateText, removeMessage} = require('./store');

const addMessage = (chat, user, message, file) => {
    return new Promise((resolve, reject) => {
        if (!chat || !user || !message) {
            console.error('[messageController] User or message not found.');
            reject('Invalid data.');
            return false;
        }

        let fileUrl = '';
        if (file) {
            fileUrl = `${host}:${port}/${publicRoute}/${filesRoute}/${file.filename}`
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl
        }
        
        add(fullMessage);
        socket.io.emit('message', fullMessage);
        resolve(fullMessage);
    });
}

const getMessages = filterUser => {
    return new Promise((resolve, reject) => {
        resolve(list(filterUser));
    });
}

const updateMessage = (id, message) => {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            reject('Invalid data.');
            return false;
        }
        const result = await updateText(id, message);
        resolve(result);
    });
}

const deleteMessage = id => {
    return new Promise(async (resolve, reject) => {
        if (!id) {
            reject('Invalid ID.');
            return false;
        }
        removeMessage(id)
        .then(() => {
            resolve();
        })
        .catch(e => {
            reject(e);
        });
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
}