const { getList,
        getDetail,
        newBlog,
        updateBlog,
        delBlog
        } = require('../controller/blog')
const { SuccessModel,
        ErrorModel 
        } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const id = req.query.id

    // Get list of blog posts
    if(req.method === 'GET' && req.path === '/api/blog/list' ) {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        } )
    }

    // Get details of blog
    if(req.method === 'GET' && req.path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // Create a new blog post
    if(req.method === 'POST' && req.path === '/api/blog/new' ){
        req.body.author = 'Collin Foo' //fake data to be replaced after adding Log In functions
        const result = newBlog(req.body)
        return result.then( data => {
            return new SuccessModel(data)
        })
    }

    // Update a blog post
    if(req.method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        return result.then( Success => {
            if (Success) {
                return new SuccessModel()
            } else {
                return new ErrorModel('Error occurred while updating blogpost')
            }
        })

    }

    //Delete a blog post
    if(req.method === 'POST' && req.path === '/api/blog/del' ) {
        const author = 'Collin Foo' //fake data to be replaced after adding Log In functions
        const result = delBlog(id, author)
        return result.then(Deleted => {
            if ( Deleted ) {
                return new SuccessModel
            } else {
                return new ErrorModel('Error occurred while deleting blogpost')
            }
        })
    }
}

module.exports = handleBlogRouter