export class ErrorData {
    private static instance: ErrorData
    
    private constructor() {

    }

    public static getInstance(): ErrorData {
        if (!ErrorData.instance) {
            ErrorData.instance = new ErrorData()
        }        
        return ErrorData.instance
    }

    missingValues:object = {
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

    isMissing(value:any) {
        if(!isNaN(value) && value.length > 0) {
            return false;
        }
        return this.missingValues.hasOwnProperty(value.toUpperCase());
    }

    calculateMissingValues(propertiesObject:any, data:Array<any>) {
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