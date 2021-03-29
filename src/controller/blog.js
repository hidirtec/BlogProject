const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author like '%${author}%' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    //return promise
    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blogs where id = '${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
}

const newBlog = (blogData = {}) => {
    // blogData is a blog object that comprises of the title, content and attributes
    const title = blogData.title
    const content = blogData.content
    const createTime = Date.now()
    const author = blogData.author

    let sql = `
        insert into blogs (title, content, createtime, author) values ('${title}','${content}',${createTime},'${author}')
    `
    return exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    const updateTime = Date.now()

    let sql = `
        update blogs set title = '${title}', content = '${content}', lastupdatetime = ${updateTime} where id = ${id}
    `

    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })

}

const delBlog = (id, author) => {
    let sql = `
        update blogs set state = 0 where id = ${id} and author = '${author}'
    `
    return exec(sql).then(deleteData => {
        if (deleteData.affectedRows > 0) {
            return true
        }
        return false
    })

}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}