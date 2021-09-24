import { errorDataFactory, ErrorData } from "./../InfoData/ErrorData"
import { NP, npFactory } from "./../Calculus/np";

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
     * Remove atributes of content.
     * @param {Array<string>} attributes. An array of the properties to erase.
     */
    removeAttributes(attributes: Array<string>) {
        let data = npFactory().data;;
        const length = data.length;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < attributes.length; j++) {
                delete data[i][attributes[j]]
            }
        } 
        
        npFactory().setData(data);  
    }


    /**
     * Replace data of the entities.
     * @param {Array} attributes 
     */
    replaceMissingAtipicalAttributes(attributes: Array<{
        attribute:string,
        mode:string // mean, median, mode, lim, remove
        type:string // atipical || missing || all
    }>){
        const data = npFactory().getData();        
        const length = data.length;

        console.log("Init num data " + length);

        // Verificar dato existe.

        for (let i = length - 1; 0 <= i; i--) {
            const currentData:any = data[i];
            for (let j = 0; j < attributes.length; j++) {
                const currentAttribute:any = attributes[j];
                if(this.alterEntity(currentData, currentAttribute)) {
                    this.actionEntity(data, i, currentAttribute)
                }               
            }            
        }     
        
        if(data.length > 0) {
            npFactory().setData(data);
            console.log("End num data " + data.length);
        }

        
    }

    private actionEntity(entityArray:Array<any>, pos:number, attribute:{
        attribute:string,
        mode:string // mean, median, mode, lim, remove
        type:string // atipical || missing || all
    }) {
        const metrics = npFactory().getUnivarsMetricsByAttributeName(attribute.attribute);

        switch (attribute.mode) {
            case "remove":
                entityArray.splice(pos, 1);
                break;
            case "lim":
                if(entityArray[pos][attribute.attribute] < metrics.tukeymin) {
                    entityArray[pos][attribute.attribute] = "" + metrics.tukeymin;
                } else if(entityArray[pos][attribute.attribute] > metrics.tukeymax) {
                    entityArray[pos][attribute.attribute] =  "" + metrics.tukeymax;
                }
                break;
            case "median":
                entityArray[pos][attribute.attribute] = "" + metrics.median;
                break;
            case "mode":
                entityArray[pos][attribute.attribute] = "" + metrics.mode;
                break;
            case "mean":
                entityArray[pos][attribute.attribute] = "" + metrics.mean;
                break;
            default:
                break;
        }

    }

    private alterEntity(entity:any, attribute:{
        attribute:string,
        mode:string // mean, median, mode, lim, remove
        type:string // atipical || missing || all
    }) {
        switch (attribute.type) {
            case "atipical":
                return this.errorDataService.isAtipical(attribute.attribute, entity[attribute.attribute]);
            case "missing":
                return this.errorDataService.isMissing(entity[attribute.attribute]);
            case "all":
                return this.errorDataService.isMissing(entity[attribute.attribute]) || this.errorDataService.isAtipical(attribute.attribute, entity[attribute.attribute]);
            default:
                return false;
        }
    }

}

export function ReplaceDataFactory() {
    return ReplaceData.getInstance();
}

