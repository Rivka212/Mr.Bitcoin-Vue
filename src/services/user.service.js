import { storageService } from "./async-storage.service"

const KEY = 'users'
const ENTITY = 'user'
const ENTITY_LOGGEDIN_USER = 'loggedinUser'

let users = []

function loadUsersFromStorage() {
    const storedUsers = localStorage.getItem(KEY)
    if (storedUsers) {
        users = JSON.parse(storedUsers)
    }
}

loadUsersFromStorage()
// _createUsers()

const user = {
    name: "Puki Ben David",
    balance: 10000,
    transactions: []
}

export const userService = {
    getUser,
    signup,
    logout,
    addMove,
    getLoggedInUser
}

function getUser() {
    return users
}

async function signup(name) {
    try {
        loadUsersFromStorage()
        // const users = await storageService.query(name)
        let foundUser = users.find(_user => _user.name === name)
        if (foundUser) {
            _saveLocalUser(foundUser)
            _saveLoggedInUser(foundUser)
            return foundUser
        } else {
            const newUser = _createUser(name)
            // const savedUser = await storageService.post(ENTITY, newUser)
            // _saveLocalUser(savedUser)
            // return savedUser
            users.push(newUser);
            // await storageService.post(ENTITY, newUser) // יוכל להיות קשור לשירות האחסון שלך אם זה מבוצע בצורה אסינכרונית
            _saveUsersToStorage() // שמור את המשתמשים ב-localStorage
            _saveLoggedInUser(newUser) // שמור את המשתמש החדש כמשתמש מחובר
            return newUser
        }

    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }    
}

async function logout() {
    try {
        _saveLocalUser(null)

        // _saveLoggedInUser(null)
        console.log("User logged out successfully");
    } catch (error) {
        console.error("Error during logout:", error);
    }
}

async function addMove(contact, amount) {
    if (!amount) return of()
    //  addMove(contact: Contact, amount: number) {
    // if (!amount) return of(null)
    const loggedInUser = getLoggedInUser()
    if (loggedInUser.coins < amount) return throwError(() => 'Not enough coins!')
    const newMove = _createMove(contact, amount)
    loggedInUser.coins -= amount
    loggedInUser.moves.unshift(newMove)
    return from(storageService.put(ENTITY, loggedInUser)).pipe(
        tap(() => _saveLocalUser(loggedInUser)),
        map(() => { }),

    )
}

function getLoggedInUser() {
    const loggedInUser = localStorage.getItem(ENTITY_LOGGEDIN_USER)
    if (!loggedInUser) {
        throw new Error("No logged-in user found")
    }
    return JSON.parse(loggedInUser)
}

// async function getLoggedInUser(user) {
//      user = loggedInUser
//     if (user === null) {
//         throw new Error("No logged-in user found")
//     }
//     return user
// }


function _createUser(name) {
    return {
        name,
        coins: 1000,
        moves: []
    }
}

function _saveLocalUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function _saveLoggedInUser(user) {    
    localStorage.setItem(ENTITY_LOGGEDIN_USER, JSON.stringify(user))
}

function _saveUsersToStorage() {
    localStorage.setItem(KEY, JSON.stringify(users))
}