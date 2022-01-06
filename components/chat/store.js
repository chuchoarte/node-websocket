const Model = require('./model');

const addChat = chat => {
    const myChat = new Model(chat);
    return myChat.save();
}

const getChats = async userId => {
    return new Promise((resolve, reject) => {
        let filter = userId ? { user: new RegExp(userId,"i") } : {};

        Model.find(filter)
        .populate('users')
        .exec((error, populated) => {
            if (error) {
                reject(error);
                return false;
            }

            resolve(populated);
        });
    });
}

module.exports = {
    add: addChat,
    list: getChats
}