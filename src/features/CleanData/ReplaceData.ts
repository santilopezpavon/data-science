declare var require: any

const Math = require('mathjs')
import { errorDataFactory, ErrorData } from "./../InfoData/ErrorData"


export class ReplaceData {

    private static instance: ReplaceData
    errorDataService: ErrorData;

    constructor() {
        this.errorDataService = errorDataFactory();
    }

    public static getInstance(): ReplaceData {
        if (!ReplaceData.instance) {
            ReplaceData.instance = new ReplaceData()
        }
        return ReplaceData.instance
    }

    /**
     * Remove any Data with an Error atribute value.
     * @param data. An array with json objects with data.
     */
    removeDataWithErrors(data: Array<object>) {
        const length = data.length;
        for (let i = length - 1; 0 <= i; i--) {
            for (const key in data[0]) {
                if (this.errorDataService.isMissing(data[i][key])) {
                    data.splice(i,1);
                    break;
                }
            }
        }
    }

    removeAttributes(data: Array<object>, attributes: Array<string>) {
        const length = data.length;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < attributes.length; j++) {
                delete data[i][attributes[j]]               
            }            
        }
    }
}

export function ReplaceDataFactory() {
    return ReplaceData.getInstance();
}

