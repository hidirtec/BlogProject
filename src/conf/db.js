const env = process.env.NODE_ENV //Environment Variable

let MYSQL_CONF

//Configuration
if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'Tumemanque@28',
        port: '3306',
        database: 'myblog'
    }

}
if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'Tumemanque@28',
        port: '3306',
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONF
}