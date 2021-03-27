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
        const listData = getList(author, keyword)
        
        return new SuccessModel(listData)
    }

    // Get details of blog
    if(req.method === 'GET' && req.path === '/api/blog/detail') {
        const detailData = getDetail(id)
        return new SuccessModel(detailData)
    }

    // Create a new blog post
    if(req.method === 'POST' && req.path === '/api/blog/new' ){
        const newBlogData = newBlog(req.body)
        return new SuccessModel(newBlogData)
        
    }

    // Update a blog post
    if(req.method === 'POST' && req.path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        if (result) {
            return new SuccessModel()
        } else {
            return new ErrorModel('Error occurred while updating blogpost')
        }
    }

    //Delete a blog post
    if(req.method === 'POST' && req.path === '/api/blog/del' ) {
        const result = delBlog(id)
        if (result) {
            return new SuccessModel
        } else {
            return new ErrorModel('Error occurred while deleting blogpost')
        }
    }
}

module.exports = handleBlogRouter