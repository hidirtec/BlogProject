const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {

    if (req.method === 'GET' && req.path === '/api/user/login') {
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                //set up a session
                req.session.username = data.username
                req.session.realname = data.realname
                return new SuccessModel()
            } else { 
                return new ErrorModel('Error encountered logging in')
            }
        })

    }

    if (req.method === 'GET' && req.path === '/api/user/login-test'){
        if(req.session.username){
            return Promise.resolve(
                new SuccessModel({
                    session: req.session
                })
                )
        }
        return Promise.resolve(new ErrorModel('Not yet logged in'))
    }

}

module.exports = {
    handleUserRouter
}