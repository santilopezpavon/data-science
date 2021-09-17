import {ReadDataFactory} from "./../../ReadData/ReadData";

export function read_csv(path:string, delimiter:string = ";") {
    const readData = ReadDataFactory();
    readData.setPath(path);
    readData.setDelimiter(delimiter);
    return readData.loadCSV().then(function (res) {
        return res;
    });    
}

export function save_csv(fileWithName:string, jsonObject:any) {
    const readData = ReadDataFactory();
    return readData.saveCSV(jsonObject, fileWithName);
}


