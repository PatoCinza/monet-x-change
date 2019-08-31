/**
 * Checks if currency has a database
 * @param { String } name currency's name
 */
function checkCurrencyDatabase (name) {
  return Array.isArray(JSON.parse(window.localStorage.getItem(name)))
}

/**
 * creates users database with initial array empty
 * @param { String } name curency name
 * @returns { Boolean } if `name` was created succesfully
 */
function createValueDatabase (name) {
  window.localStorage.setItem(name, JSON.stringify([]))
  return checkCurrencyDatabase(name)
}

/**
 * Sets a new value on currency array of values
 * @param { String } name currency name
 * @param { Number } newValue new value to store
 */
export function setValueHistory (name, newValue) {
  window.localStorage.setItem(name, JSON.stringify(getValueHistory(name).concat(newValue)))
}

/**
 * Gets value history from localStorage
 * @param { String } name currency name
 * @returns { Array<Number> } currencies Array
 */
export function getValueHistory (name) {
  if (!checkCurrencyDatabase(name)) {
    createValueDatabase(name)
  }
  try {
    return JSON.parse(window.localStorage.getItem(name))
  } catch (e) {
    createValueDatabase(name)
    return getValueHistory(name)
  }
}
