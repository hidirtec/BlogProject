const { loginCheck } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {

    if (req.method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        const result = loginCheck(username, password)
        if(result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('Error encountered logging in')
        }
    }
}

module.exports = handleUserRouter