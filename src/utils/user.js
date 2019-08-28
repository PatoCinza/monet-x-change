import { compose } from './functional'

/**
 * checks if `users` 'database' is created in localStorage
 * @returns { Boolean } if `users` is there or not
 */
function checkUsersDatabase () {
  return Array.isArray(JSON.parse(window.localStorage.getItem('users')))
}

/**
 * LocalStorage abstraction, fixes 'users' value, validates and sets the param in there for you
 * @param { Array<User> } users new array to set
 * @returns { Boolean } if it was succesfull or not
 */
function setUsers (users) {
  if (Array.isArray(users)) {
    window.localStorage.setItem('users', JSON.stringify(users))
    return true
  }
  return false
}

/**
 * creates users database with initial array empty
 * @returns { Boolean } if `users` was created succesfully
 */
function createUsersDatabase () {
  setUsers([])
  return checkUsersDatabase()
}

/**
 * get users database from localStorage, if it breaks, it resets the base
 * @returns { Array<User> } Users already registered
 */
function getUsersArray () {
  try {
    if (!checkUsersDatabase()) throw Error('No Users database')
    return JSON.parse(window.localStorage.getItem('users'))
  } catch (e) {
    return compose(getUsersArray, createUsersDatabase)()
  }
}

/**
 * Finds a user in the database
 * @param { String } username user's username
 * @param { String } password user's password
 * @returns { Boolean } wether it exists or nots
 */
function userExists (username) {
  return Boolean(getUsersArray().find(user => user.username === username))
}

/**
 * Insert a user into `users` array in localStorage
 * @param { String } username user's username
 * @param { String } password user's password
 * @returns { Boolean } wether it was successfull or not
 */
export function insertUser (username, password) {
  if (!userExists(username)) {
    return compose(
      setUsers,
      users => users.concat({ username, password }),
      getUsersArray
    )()
  }
  return false
}

/**
 * fetches the user by username and password, finding it sets as active user
 * @param { String } username user's username
 * @param { String } password user's password
 * @returns { User|null } User if found, null otherwise
 */
export function login (username, password) {
  const user = getUsersArray().find(user =>
    user.username === username && user.password === password
  )
  if (user) {
    setActiveUser(user)
    return user
  }
  return false
}

/**
 * removes active user from session storage
 * @returns { undefined } User if found, null otherwise
 */
export function logout () {
  window.sessionStorage.removeItem('activeUser')
}

/**
 * Sets user as active by putting him in activeUser on session
 * @param { User } user user logging in
 * @returns { undefined }
 */
function setActiveUser (user) {
  window.sessionStorage.setItem('activeUser', JSON.stringify(user))
}

/**
 * gets active user from session storage
 * @returns { String } user's username or empty string
 */
export function getActiveUser () {
  try {
    return JSON.parse(window.sessionStorage.getItem('activeUser')).username
  } catch (e) {
    return ''
  }
}
