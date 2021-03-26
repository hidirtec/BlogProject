const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req,res)=>{
    console.log(req.method)     //GET
    const url = req.url   
    console.log(url)      
    req.query = querystring.parse(url.split('?')[1])
    console.log('query: ',req.query)
    res.writeHead(200, {'content-type':'text/html'})
    res.end(JSON.stringify(req.query))
})

server.listen(3000, ()=>{
    console.log('listening on port 3000')
})