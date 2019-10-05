var mysql = require('promise-mysql');

var dbConfig = {
    connectionLimit: 500,
    host: 'localhost',
    user: 'root',
    password: 'root1234',
    database: 'grubHub',
    port: 3306,
    debug: false,
    multipleStatements: true
}

module.exports = async () => {
    var pool = await mysql.createPool(dbConfig)
    return new Promise(async (resolve, reject) => {
        pool.getConnection().then(function (con) {
            if (con) {
                console.log("db connected yaay")
                resolve(con)
            }
        }).catch(function (err) {
            console.log("error " + err)
            reject(err)
        });
    })
}