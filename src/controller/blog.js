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

module.exports = {
    getList,
    getDetail
}