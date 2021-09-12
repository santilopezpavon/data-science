declare function require(name: string);
const csv = require("csvtojson");
const converter = require('json-2-csv');
const fs = require('fs');



export default class ReadData {

    path: string;
    delimiter: string;

    constructor(path: string, delimiter: string = ";") {
        this.path = path;
        this.delimiter = delimiter;
    }


    loadCSV(callback: any) {
        csv({
            delimiter: this.delimiter
        })
            .fromFile(this.path)
            .then(function (jsonArrayObj) {
                callback(jsonArrayObj);
            })
    }

    saveCSV(jsonObject, name, callback: any) {
        converter.json2csv(jsonObject, (err, csv) => {
            if (err) {
                console.log("Hola");
                throw err;
            }        
            fs.writeFileSync(name + '.csv', csv);            
            callback();
        });
    }        
}