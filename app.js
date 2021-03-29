const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')

const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            ) 
        })
    })
    return promise
}

const serverHandle = (req, res) => {
    res.setHeader('Content-type','application/json')
    
    // assign url path
    req.path = req.url.split('?')[0]

    // assign query parameters
    req.query = querystring.parse(req.url.split('?')[1])

    // handle post data
    getPostData(req).then(postData => {
        req.body = postData

        //handle blog routes
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                res.end(
                    JSON.stringify(blogData)
                )
             })
        return
        }
        

        // handle user routes
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }       
        

        // handle 404 error
        res.writeHead(404, {"Content-type":"text/plain"})
        res.write("404 Not Found \n")
        res.end()
        })
}

module.exports = serverHandle