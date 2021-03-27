const handleBlogRouter = (req, res) => {

    // Get list of blog posts
    if(req.method === 'GET' && req.path === '/api/blog/list' ) {
        return {
            msg : 'This API returns the list of blog posts'
        }
    }

    // Get details of blog
    if(req.method === 'GET' && req.path === '/api/blog/detail') {
        return {
            msg: 'This API returns the details of blog posts'
        }
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