const KEY = 'users'
// _createUsers()

const user = {
    name: "Puki Ben David",
    balance: 10000,
    transactions: []
}

export const userService = {
    getUser,
}

function getUser(){
    return user
}