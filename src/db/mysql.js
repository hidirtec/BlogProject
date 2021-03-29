const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

//Create an SQL connection
const con = mysql.createConnection(MYSQL_CONF)

//Commence connection
con.connect()

//function to query sql
function exec(sql){
    const promise = new Promise((resolve, reject) => {
        con.query(sql,(err, result) => {
            if(err){
                reject(err)
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec
}