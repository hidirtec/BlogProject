const loginCheck = (username, password) => {
    if (username === 'Hidir' && password === 'Koh'){
        return true
    }
    return false
}

module.exports = {
    loginCheck
}