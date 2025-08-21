const todo = require("./todo.json");
const users = require("./users.json");

//console.log(users.at(0))

const userData = users.map((item, index) => {
    return {
        "index": index,
        "id": item.id,
        "name": item.name,
        "username": item.username,
        "email": item.email,
    }
})

const findUserById = users.find((item) => item.id === 10);


const filterUserData = users
    .filter((item, index) => {
        return item.username.length > 5 && item.name.length > 15
    }).map((item, index) => {
        return {
            "index": index,
            "id": item.id,
            "name": item.name,
            "username": item.username,
            "email": item.email,
        }
    }).find((item) => item.id === 10);

// console.log(filterUserData)

// const {index, id, name, username, email} = userData[0];
// console.log(index, id, name, username, email);


let array = [];

for (let user of users) {
    let todosFilter = todo.filter((item) => item.userId === user.id);
    let {name, username, email} = user;
    array.push({
        name,
        username,
        email,
        todo: JSON.stringify(todosFilter)
    })
}

console.log(array);










