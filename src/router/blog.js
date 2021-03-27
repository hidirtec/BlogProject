const { getList, getDetail } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {

    // Get list of blog posts
    if(req.method === 'GET' && req.path === '/api/blog/list' ) {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const listData = getList(author, keyword)
        
        return new SuccessModel(listData)
    }

    // Get details of blog
    if(req.method === 'GET' && req.path === '/api/blog/detail') {
        const id = req.query.id
        const detailData = getDetail(id)
        return new SuccessModel(detailData)
    }

    // Create a new blog post
    if(req.method === 'POST' && req.path === '/api/blog/new' ){
        return{
            msg: 'This API creates a new blog post'
        }
    }

    // Update a blog post
    if(req.method === 'POST' && req.path === '/api/blog/update') {
        return {
            msg: 'This API updates a blog post'
        }
    }

    //Delete a blog post
    if(req.method === 'POST' && req.path === '/api/blog/del' ) {
        return {
            msg: 'This API deletes a blog post'
        }
    }
}

module.exports = handleBlogRouter