declare var require: any

const Math = require('mathjs')
import { errorDataFactory, ErrorData } from "./../InfoData/ErrorData"


export class Correlations {

    private static instance: Correlations
    private errorDataService: ErrorData;

    private constructor() { 
        this.errorDataService = errorDataFactory();
    }

    public static getInstance(): Correlations {
        if (!Correlations.instance) {
            Correlations.instance = new Correlations()
        }
        return Correlations.instance
    }

    getCorrelations(procesedData: any) {
        let correlationsArray = [];

        const typeDataArray: Array<any> = procesedData.attributes.data;
        const propertiesTypeNumber = typeDataArray.filter(function (item) {
            if (item.type === "Number") {
                return true;
            }
        });

        for (let i = 0; i < propertiesTypeNumber.length; i++) {
            const property = propertiesTypeNumber[i];
            for (let j = i + 1; j < propertiesTypeNumber.length; j++) {
                const propertySecond = propertiesTypeNumber[j];
                const atributesValues = this.getAttributes(procesedData, property.name, propertySecond.name);                
                const correlation = this.getCorrelation(atributesValues.propertyA, atributesValues.propertyB);
                correlationsArray.push({
                    propA: property.name,
                    propB: propertySecond.name,
                    correlation: correlation
                })
            }
        }
        return correlationsArray;
    }


    getAttributes(procesedData, propertyA, propertyB) {
        const data = procesedData.items.data;
        
        let objectProcesed:any = {
            propertyA: [],
            propertyB: [],
        };

        procesedData.items.data.map(a => {
            if (
                !this.errorDataService.isMissing(a[propertyA]) && 
                !this.errorDataService.isMissing(a[propertyB]) &&
                !this.errorDataService.isAtipical(propertyB, a[propertyB])  && 
                !this.errorDataService.isAtipical(propertyA, a[propertyA]) 
            ) {
                objectProcesed.propertyA.push(parseFloat(a[propertyA]));
                objectProcesed.propertyB.push(parseFloat(a[propertyB]));
            }
        });
        return objectProcesed;
    }

    getCorrelation(arr1: Array<number>, arr2: Array<number>) {
        const sx = Math.std(arr1);
        const sy = Math.std(arr2);
        let covar = this.getCovariance(arr1, arr2);
        return (covar) / (sx * sy);
    }

    getCovariance(arr1: Array<number>, arr2: Array<number>) {
        let sum = 0;
        let media1 = Math.mean(arr1);
        let media2 = Math.mean(arr2);
        let n = arr1.length;

        for (let i = 0; i < n; i++){
            const section = (arr1[i] - media1) * (arr2[i] - media2) / (n - 1);
            sum = sum + section;
        }         

        return sum;        
    }
}

export function correlationsFactory() {
    return Correlations.getInstance();
}