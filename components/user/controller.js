const {add, list} = require('./store');

const addUser = name => {
    if (!name) {
        return Promise.reject('Invalid name.');
    }

    const user = {
        name
    }

    return add(user);
}

const getUser = filter => {
    return new Promise((resolve, reject) => {
        resolve(list(filter));
    });
}

module.exports = {
    add: addUser,
    list: getUser,
}