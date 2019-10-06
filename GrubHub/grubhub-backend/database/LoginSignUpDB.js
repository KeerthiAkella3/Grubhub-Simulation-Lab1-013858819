const dbConnection = require('./dbConnectionPool');




module.exports = class LoginSignUpDB {

  async checkIfEmailExists(table,email){
    let con = await dbConnection();
    try {
        await con.query("START TRANSACTION");
        let result = await con.query('SELECT * FROM ?? WHERE emailId = ?', [table, email]);
        await con.query("COMMIT");
        result = JSON.parse(JSON.stringify(result));
        return result;
      } catch (ex) {
        console.log(ex);
        throw ex;
      } finally {
        await con.release();
        await con.destroy();
      }
}

    async createNewUser(table,inputData){
        let con = await dbConnection();
        try {
            await con.query("START TRANSACTION");
            let savedUser = await con.query('INSERT INTO ?? SET ?', [table, inputData]);
            await con.query("COMMIT");
            inputData.id = savedUser.insertId;
            console.log(inputData);
            return inputData;
          } catch (ex) {
            console.log(ex);
            await con.query("ROLLBACK");
            console.log(ex);
            throw ex;
          } finally {
            await con.release();
            await con.destroy();
          }
    }

    async login(table,emailId,password) {
      let con = await dbConnection();
      try {
          await con.query("START TRANSACTION");
          //select * from buyerTable where emailId = 'admin' and userPassword = 'd033e22ae348aeb5660fc2140aec35850c4da997'
          let result = await con.query('SELECT * FROM ?? WHERE emailId = ? AND userPassword = ?', [table, emailId, password]);
          await con.query("COMMIT");
          result = JSON.parse(JSON.stringify(result));
          console.log("result in login db"+result)
          return result;
        } catch (ex) {
          console.log(ex);
          throw ex;
        } finally {
          await con.release();
          await con.destroy();
        }
      }

      async checkIfUserExists(table,id){
        let con = await dbConnection();
        try {
            await con.query("START TRANSACTION");
            let result = await con.query('SELECT * FROM ?? WHERE emailId = ?', [table, id]);
            await con.query("COMMIT");
            result = JSON.parse(JSON.stringify(result));
            return result;
          } catch (ex) {
            console.log(ex);
            throw ex;
          } finally {
            await con.release();
            await con.destroy();
          }
    }

    // buyerId INT NOT NULL AUTO_INCREMENT,
    // buyerName VARCHAR(100) NOT NULL,
    // emailId VARCHAR(40) NOT NULL,
    // userPassword VARCHAR(100) NOT NULL,
    //   Address VARCHAR(200),
    //   phoneNumber int(15) NOT NULL,
    // PRIMARY KEY ( buyerId));



    async updateBuyer(table,id,inputData){
      let con = await dbConnection();
        try {
            await con.query("START TRANSACTION");
            await con.query(`UPDATE ?? SET buyerName = ?, phonenumber = ?, Address = ?
            WHERE id = ?`,[
                  table,
                  inputData.buyerName,
                  //inputData.img,
                  inputData.phonenumber,
                  inputData.Address,
                  (id)
                  ]);
            await con.query("COMMIT");
            //console.log("in login db  "+inputData);
            return true;
          } catch (ex) {
			await con.query("ROLLBACK");
            console.log(ex);
            throw ex;
          } finally {
            await con.release();
            await con.destroy();
          }
    }

    async updateOwner(table,id,inputData){
      let con = await dbConnection();
        try {
            await con.query("START TRANSACTION");
            await con.query(`UPDATE ?? SET ownerName = ?, phonenumber = ?, Address = ?
            WHERE id = ?`,[
                  table,
                  inputData.ownerName,
                  //inputData.img,
                  inputData.phonenumber,
                  inputData.Address,
                  (id)
                  ]);
            await con.query("COMMIT");
            //console.log("in login db  "+inputData);
            return true;
          } catch (ex) {
			await con.query("ROLLBACK");
            console.log(ex);
            throw ex;
          } finally {
            await con.release();
            await con.destroy();
          }
    }

    async addProfilePic(table, id, filename) {
      let con = await dbConnection();
      try {
        await con.query("START TRANSACTION");
        await con.query(`UPDATE ?? SET image = ? WHERE id = ?`, [
            table,
            filename,
            id
          ]);
        await con.query("COMMIT");
        return true;
      } catch (ex) {
        await con.query("ROLLBACK");
        console.log(ex);
        throw ex;
      } finally {
        await con.release();
        await con.destroy();
      }
    }

    async getProfilepic(table,id){
      let con = await dbConnection();
      try {
          await con.query("START TRANSACTION");
          console.log("In get profile [piv")
          let result = await con.query('SELECT image FROM ?? WHERE id = ?', [table, id]);
          await con.query("COMMIT");
          console.log("result in db ")
          console.log(result)
          result = JSON.parse(JSON.stringify(result[0]));
          console.log("result in db ")
          console.log(result)
          return result;
        } catch (ex) {
          console.log(ex);
          throw ex;
        } finally {
          await con.release();
          await con.destroy();
        }
      }

}