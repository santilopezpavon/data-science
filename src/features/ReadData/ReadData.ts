declare function require(name: string);
const csv = require("csvtojson");

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
}