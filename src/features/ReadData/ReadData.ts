declare function require(name: string);

const csv = require("csvtojson");
const converter = require('json-2-csv');
const fs = require('fs');


/**
 * This class is for Read or Load a CSV.
 */
export class ReadData {
    
    private static instance: ReadData

    public static getInstance(): ReadData {
        if (!ReadData.instance) {
            ReadData.instance = new ReadData()
        }
        return ReadData.instance
    }

    /**
     * The path of the CSV file to Load
     */
    path: string;

    /**
     * The columns delimiter of the CSV file
     */
    delimiter: string = ";";

    setPath(path: string) {
        this.path = path;
    }

    setDelimiter(delimiter: string) {
        this.delimiter = delimiter;
    }

    /**
     * Load the CSV getted by path parameter.
     */
    loadCSV() {
        return csv({
            delimiter: this.delimiter
        })
            .fromFile(this.path)
            .then(function (jsonArrayObj) {
                return jsonArrayObj;
            })
    }

    /**
     * Convert a JSON object to CSV and save in a file.
     * @param jsonObject The JSON object passed by parameter.
     * @param fileWithName The path and name that the file will be created
     */
    saveCSV(jsonObject, fileWithName) {
        return converter.json2csv(jsonObject, (err, csv) => {
            if (err) {
                throw err;
            }
            fs.writeFileSync(fileWithName + '.csv', csv);
            return true;
        });
    }
}

export function ReadDataFactory() {
    const instancia: ReadData = ReadData.getInstance();
    return instancia;
}