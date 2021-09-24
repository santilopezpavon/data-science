import {Attribute} from "./../Types/TypeProperties";
import { NP, npFactory } from "./../Calculus/np";

export class ErrorData {
    private static instance: ErrorData
    
    public static getInstance(): ErrorData {
        if (!ErrorData.instance) {
            ErrorData.instance = new ErrorData()
        }        
        return ErrorData.instance
    }

    /**
     * The list with the missing values.
     */
    private missingValues:object = {
        "N/A": 1,
        "NULL": 1,
        "EMPTY": 1,
        "NA": 1,
        "?": 1,
        "NONE": 1,
        "-": 1,
        "NAN": 1,
        " ": 1,
        "": 1       
    }

    /**
     * Check if a value is missing.
     * @param {any} value The value to check if is missing value. 
     * @returns {boolean} 
     */
    isMissing(value:any) {
        if(!isNaN(value) && value.length > 0) {
            return false;
        }
       return this.missingValues.hasOwnProperty(value.toUpperCase());
    }

    isAtipical(attr:string, value:any) {
        const np = npFactory();
        np.calculateMetrics();
        const univars = np.procesedData.univarsMetrics;

        const propCurrent = univars.find(function (item) {
            return item.name === attr;
        });
        
        if (
            propCurrent &&
            propCurrent.tukeyminextreme <= value &&
            propCurrent.tukeymaxextreme >= value
        ) {
            return false;
        }
        return true;
    }

    /**
     * Count the number and percent of data with errors by properties.
     * @param {object} propertiesObject  The object of information about the properties in the data.
     * @param {Array<any>} data The data array with all elements to check. 
     */
    calculateMissingValues(propertiesObject:object, data:Array<any>) {
        const totalDatos = data.length;
        for (const key in propertiesObject) {
            propertiesObject[key]["error"] = 0;
        }
        for (let index = 0; index < data.length; index++) {
            const current = data[index];
            for (const key in current) {
                const value = current[key];
                if (this.isMissing(value)) {
                    propertiesObject[key]["error"]++;
                }
            }
        }for (const key in propertiesObject) {
            propertiesObject[key]["percentError"] = Math.round((propertiesObject[key]["error"] / totalDatos) * 100) / 100;
        }
        return propertiesObject;
    }

    

}

export function errorDataFactory() {
    return ErrorData.getInstance();
}


