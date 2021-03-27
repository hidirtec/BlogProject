const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res) => {
    res.setHeader('Content-type','application/json')
    
    req.path = req.url.split('?')[0]

    // handle blog routes
    const blogData = handleBlogRouter(req , res)
    if (blogData) {
        res.end(
            JSON.stringify(blogData)
        )
        return
    }

    // handle user routes
    const userData = handleUserRouter(req, res)
    if (blogData) {
        res.end(
            JSON.stringify(blogData)
        )
        return
    }

    // handle 404 error
    res.writeHead(404, {"Content-type":"text/plain"})
    res.write("404 Not Found \n")
    res.end()
}

module.exports = serverHandle