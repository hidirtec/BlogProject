const handleBlogRouter = require('./src/router/blog')
const {handleUserRouter} = require('./src/router/user')
const querystring = require('querystring')
const { Console } = require('console')

// Get Expiry Date of cookie
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

//Session data
const SESSION_DATA = {}

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

    // parse request cookies
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    //parse session 
    let needSetCookie = false
    let userId = req.cookie.userid
    if (userId){
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        } 
            req.session = SESSION_DATA[userId]   
    }   else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        req.session = {}
    }

    // handle post data
    getPostData(req).then(postData => {
        req.body = postData

        //handle blog routes
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
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
                if (needSetCookie) {
                    res.setHeader('Set-Cookie',`userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
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