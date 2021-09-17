import { errorDataFactory, ErrorData } from "./../InfoData/ErrorData"
import { NP } from "./../Calculus/np";

export class ReplaceData {

    private static instance: ReplaceData
    errorDataService: ErrorData;
    private df;

    constructor() {
        this.errorDataService = errorDataFactory();
    }

    public static getInstance(): ReplaceData {
        if (!ReplaceData.instance) {
            ReplaceData.instance = new ReplaceData()
        }
        return ReplaceData.instance
    }

    update(df: NP) {
        this.df = df;
    }

    /**
     * Remove any Data with an Error atribute value.
     */
    removeDataWithErrors() {
        let data = this.df.data;
        
        const length = data.length;
        for (let i = length - 1; 0 <= i; i--) {
            for (const key in data[0]) {
                if (this.errorDataService.isMissing(data[i][key])) {
                    data.splice(i, 1);
                    break;
                }
            }
        }
        if(data.length > 0) {
            this.df.setData(data);        

        } else {
            console.error("La modificación afecta a todos los datos, no se ha podido realizar.");
        }
    }

    /**
     * Remove atributes of content.
     * @param attributes. An array of the properties to erase.
     */
    removeAttributes(attributes: Array<string>) {
        let data = this.df.data;;
        const length = data.length;
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < attributes.length; j++) {
                delete data[i][attributes[j]]
            }
        } 
        
        this.df.setData(data);  
    }

    /**
     * Update missing data of the attributes to pass by parameter with diferents modes.
     * @param {Array<string>} attributes. An array of the properties to alter.
     * @param {string} mode. The mode for replace missing data [mode || mean || median]
     */
    updateDataWithErrors(attributes: Array<string>, mode: string = "median") {
        // Preparar las metricas de los atributos.
        let valueForReplace = {};
        for (let i = attributes.length - 1; i >= 0; i--) {
            const element = attributes[i];
            const dataReplace = this.df.procesedData.univarsMetrics.filter(function (item) {
                if(item.name === element) {
                    return true;
                }
            });
            if(dataReplace && dataReplace.length > 0) {
                valueForReplace[element] = dataReplace[0][mode];
            } else {
                console.error("No hay datos de " + element);     
                attributes.splice(i, 1)      
            }
        }

        let data = this.df.data;
        for (let i = 0; i < data.length; i++) {
            const currentData = data[i];
            for (let j = 0; j < attributes.length; j++) {
                const element = attributes[j];
                if (this.errorDataService.isMissing(currentData[element])) {
                    currentData[element] = "" + valueForReplace[element]
                }                
            }               
        }    
        
        this.df.setData(data);  
       
    }

}

export function ReplaceDataFactory(df: NP) {
    const instancia = ReplaceData.getInstance();
    instancia.update(df);
    return instancia;
}

