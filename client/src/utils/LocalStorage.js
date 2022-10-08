export const persisLocalStorage = (key , value) => {
    localStorage.setItem(key, JSON.stringify({...value}))
}

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key)
}