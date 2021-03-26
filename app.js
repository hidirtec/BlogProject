const http = require('http')

// const querystring = require('querystring')

// const server = http.createServer((req,res)=>{
//     console.log(req.method)     //GET
//     const url = req.url   
//     console.log(url)      
//     req.query = querystring.parse(url.split('?')[1])
//     console.log('query: ',req.query)
//     res.writeHead(200, {'content-type':'text/html'})
//     res.end(JSON.stringify(req.query))
// })

const server = http.createServer((req, res)=>{
    if (req.method === 'POST'){
        //get request format
        console.log('request content type: ',req.headers['content-type'])
        //receive data
        let postData = ''
        req.on('data',chunk => {
            postData += chunk.toString()
        })
        req.on('end',() =>{
            console.log('postData: ',postData)
            res.end('Hello World')
        })
    }
})

server.listen(3000, ()=>{
    console.log('listening on port 3000')
})