import { errorDataFactory, ErrorData } from "./ErrorData"

export class TypeData {
   
    data: Array<any>;
    errorDataService:ErrorData;

    constructor() {        
        this.errorDataService = errorDataFactory()
    }

    setData(data: Array<any>) {
        this.data = data;
    }

    getTypeData(value) {
        if (!this.errorDataService.isMissing(value)) {
            if (!isNaN(value)) {
                return "Number";
            } else {
                return "NotNumber";
            }
        }
        return "Missing";
    }

    getTypeDataObject() {
        let typeData = {};
        const firstData = this.data[0];
        const keys = Object.keys(firstData);
        let id = 0;
        keys.forEach(key => {
            typeData[key] = {};
            typeData[key].id = id;
            typeData[key].name = key;
            typeData[key].type = this.getTypeData(firstData[key]);
            
            if (typeData[key].type === 'Missing') {
                for (let index = 1; index < 10; index++) {
                    const element = this.data[index];
                    let dataTypeCurrent = this.getTypeData(element[key]);
                    if (dataTypeCurrent !== 'Missing') {
                        typeData[key].type = dataTypeCurrent;
                        break;
                    }
                }
            }
           
            id++;
        });
        this.errorDataService.calculateMissingValues(typeData, this.data);
        
        const typeDataArray = Object.keys(typeData).map(key => typeData[key]);

        //const typeDataArray:any[] = Object.values(typeData);
        return typeDataArray;
    }     

    convertNumericData() {
    }
}

export function TypeDataFactory() {
    return new TypeData();
}