import { errorDataFactory, ErrorData } from "./ErrorData"
import {Attribute} from "./../Types/TypeProperties";

export class TypeData {
   
    data: Array<any>;
    errorDataService:ErrorData;
    typeData: any

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
            let currentType:Attribute = <Attribute>{};
            typeData[key] = {};
            currentType.id = id;
            currentType.name = key;
            currentType.type = this.getTypeData(firstData[key]);
            
            if (currentType.type === 'Missing') {
                for (let index = 1; index < 10; index++) {
                    const element = this.data[index];
                    let dataTypeCurrent = this.getTypeData(element[key]);
                    if (dataTypeCurrent !== 'Missing') {
                        currentType.type = dataTypeCurrent;
                        break;
                    }
                }
            }

            currentType.numUniques = 0;

            typeData[key] = currentType;
           
            id++;
        });
        this.errorDataService.calculateMissingValues(typeData, this.data);
        
        const typeDataArray = Object.keys(typeData).map(key => typeData[key]);

        //const typeDataArray:any[] = Object.values(typeData);
        this.typeData = typeDataArray;
        return typeDataArray;
    }     

    updateTypeNotNumericData(uniques:object) {
        const numData = this.data.length;
        const current = this;
        for (const key in uniques) {
            let currentTypes = this.typeData.filter(function (item) {
                return item.name === key;
            });
            if(currentTypes && currentTypes.length > 0)  {
                currentTypes.map(function (currentType) {
                    currentType.numUniques = uniques[key].length;
                    if(current.isCategorical(currentType.numUniques)) {
                        currentType.type = "Categorical";                        
                    }
                });                
            }
        }
    }

    isCategorical(numUniques:number) {
        let numDataConsideration = 50;
        if(this.data.length > numDataConsideration) {
            numDataConsideration = this.data.length * 0.5;
        }
        return numDataConsideration > numUniques;
    }
}

export function TypeDataFactory() {
    return new TypeData();
}