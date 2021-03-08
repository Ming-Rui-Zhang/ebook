import Storage from 'web-storage-cache'

const localStorage = new Storage()

export function setLocalStorage(key, value) {
  return localStorage.set(key, value)
}

export function getLocalStorage(key) {
  return localStorage.get(key)
}

export function removeLocalStorage(key) {
  return localStorage.delete(key)
}

export function clearLocalStorage() {
  return localStorage.clear()
}

export function setBookObject(fileName, key, value) {
  let book = getLocalStorage(`${fileName}-info`)
  if (!book) {
    book = {}
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}

export function getBookObject(fileName, key) {
  const book = getLocalStorage(`${fileName}-info`)
  if (book) {
    return book[key]
  }
  return null
}

export function saveBookShelf(shelf) {
  setLocalStorage('shelf', shelf)
}

export function getBookShelf() {
  return getLocalStorage('shelf')
}

// 国际化中英文用
export function getLocale() {
  return getLocalStorage('locale')
}

export function saveLocale(locale) {
  setLocalStorage('locale', locale)
}

export function saveLocation(fileName, value) {
  setBookObject(fileName, 'location', value)
}

export function getLocation(fileName) {
  return getBookObject(fileName, 'location')
}

export function saveReadTime(fileName, value) {
  setBookObject(fileName, 'readTime', value)
}

export function getReadTime(fileName) {
  return getBookObject(fileName, 'readTime')
}

export function saveBookmark(fileName, value) {
  setBookObject(fileName, 'bookmark', value)
}

export function getBookmark(fileName) {
  return getBookObject(fileName, 'bookmark')
}

export function saveSearchHistory(data) {
  let localStorage = getLocalStorage('SearchHistory')
  if (!localStorage) {
    localStorage = []
  }
  localStorage.push(data)
  if (localStorage.length >= 6) {
    localStorage = localStorage.splice(1, 5)
  }
  setLocalStorage('SearchHistory', localStorage)
}

export function getSearchHistory(data) {
  return getLocalStorage('SearchHistory')
}

export function clearSearchHistory(data) {
  return removeLocalStorage('SearchHistory')
}
