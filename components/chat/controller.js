const {add, list} = require('./store');

const addChat = users => {
    if (!users || !Array.isArray(users)) {
        return Promise.reject('Invalid user');
    }

    const chat = {
        users: users
    };

    return add(chat);
}

const getChat = filter => {
    return new Promise((resolve, reject) => {
        resolve(list(filter));
    });
}

module.exports = {
    add: addChat,
    list: getChat,
}