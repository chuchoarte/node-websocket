const Model = require('./model');

const addUser = user => {
    const myUser = new Model(user);
    return myUser.save();
}

const getUsers = async filterUser => {
    let filter = filterUser ? { name: new RegExp(filterUser,"i") } : {};
    const user = await Model.find(filter);
    return user;
}

module.exports = {
    add: addUser,
    list: getUsers
}