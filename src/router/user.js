const handleUserRouter = (req, res) => {

    if (req.method === 'POST' && req.path === '/api/user/login') {
        return {
            msg: 'This API handles login'
        }
    }
}

module.exports = handleUserRouter