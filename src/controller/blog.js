const getList = (author, keyword) => {
    //returns fake list for testing
    return [
        {
            id: 1,
            title: 'Title 1',
            content: 'Content 1',
            createTime: 1616835510521,
            author: 'Author 1'
        },
        {
            id: 2,
            title: 'Title 2',
            content: 'Content 2',
            createTime: 1616835752523,
            author: 'Aurthor 2'
        }
    ]
}

const getDetail = (id) => {
    //returns fake details for testing
    return {
        id: 1,
        title: 'Title 1',
        content: 'Content 1',
        createTime: 1616835510521,
        author: 'Author 1'
    }
}

const newBlog = (blogData = {}) => {
    // blogData is a blog object that comprises of the title, content and attributes
    return {
        id: 3 // represents the id of the new blog post
    }
}

const updateBlog = (id, blogData = {}) => {
    // blogData is a blog object that comprises of the title, content and attributes
    // id refers to the id of the blog to update
    return true
}

const delBlog = (id) => {
    //id refers to the id number of blogpost to be deleted
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}