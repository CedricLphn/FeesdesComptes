import { Constants, SQLite } from 'expo';

const db = SQLite.openDatabase("database.db");

export default class SQL {
    createTable(name, query) {
        return db.transaction(tx => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS ${name} (${query})`);
          });
    }

    query(query) {
        return db.transaction(tx => {
            tx.executeSql(query);
          });    
    }

    insert(tableName, column) {

        var size = 0;

        for(let item in column) {
            if (column.hasOwnProperty(item)) size++;
        }

        var columnName = "";
        var data = "";

        let count = 0;

        for(let item in column) {
            count++;
            if(count === size) {
                columnName += item;
                data += `'${column[item]}'`
            }else {
                data += `'${column[item]}',`
                columnName += item + ',';
            }
        }

        console.log(`INSERT INTO ${tableName}(${columnName}) VALUES(${data})`)

        // return db.transaction(tx => {
        //     tx.executeSql(`INSERT INTO ${tableName}(${columnName}) VALUES(${data})`);
        //   }); 
    }



}