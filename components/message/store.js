
const { populate } = require('./model');
const Model = require('./model');


const addMessage = message => {
    const myMessage = new Model(message);
    myMessage.save()
    .then(response => {
        console.log('Message sended correctly.');
    }).catch(e => {
        console.log(e)
    });
}

const getMessages = filterUser => {
    return new Promise((resolve, reject) => {
        let filter = filterUser ? { user: new RegExp(filterUser,"i") } : {};

        Model.find(filter)
        .populate('user')
        .exec((error, populated) => {
            if (error) {
                reject(error);
                return false;
            }

            resolve(populated);
        });
    });
}

const updateText = async (id, message) => {
    const foundMessage = await Model.findOne({
        _id: id
    });

    
    foundMessage.message = message;
    const newMessage = await foundMessage.save();
    return newMessage;
}

const removeMessage = id => {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    add: addMessage,
    list: getMessages,
    updateText: updateText,
    removeMessage
}