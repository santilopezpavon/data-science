import { DataFrameFactory, DataFrame } from "./../VisualizeData/DataFrame";
// import { errorDataFactory } from "./../VisualizeData/DataFrame";
import { TypeDataFactory, TypeData } from "./../InfoData/TypeData"
import { univariableMetricsFactory, UnivariableMetrics } from "./../Statistics/UnivariableMetrics";
import { correlationsFactory, Correlations } from "./../Relations/Correlations";

export class NP {

    data: Array<any>
    typeDatasService: TypeData
    univariableMetricsService: UnivariableMetrics
    correlationsService:Correlations

    constructor() {
        this.typeDatasService = TypeDataFactory();
        this.univariableMetricsService = univariableMetricsFactory();
        this.correlationsService = correlationsFactory();
    }

    procesedData: {
        items: {
            data: Array<any>,
            dataFrame: DataFrame
        },
        attributes: {
            data: Array<{
                name: string,
                id: number,
                type: string,
                errorPercent: number,
                error: number
            }>,
            dataFrame: DataFrame
        },
        attributesSeparated: object,
        univarsMetrics: Array<any>,
        correlations: Array<any>
    }



    setData(data: Array<any>) {
        this.data = data;
        this.typeDatasService.setData(this.data);
        this.preProcessData();
    }


    private preProcessData() {
        const typeData: any[] = this.typeDatasService.getTypeDataObject();
        this.procesedData = {
            items: {
                data: this.data,
                dataFrame: DataFrameFactory(this.data)
            },
            attributes: {
                data: typeData,
                dataFrame: DataFrameFactory(typeData)
            },         
            attributesSeparated: this.getAllAtributesUnidimensional(typeData),
            univarsMetrics: [],
            correlations:[]
        }
    }

    head(atributes = [], lim = 5) {
        return this.procesedData.items.dataFrame.print(atributes, lim);
    }

    describe(atributes?, lim?) {
        this.calculateMetrics();
        return DataFrameFactory(this.procesedData.univarsMetrics).print(atributes, lim);
    }

    infoAtributes(atributes?, lim?) {        
        return this.procesedData.attributes.dataFrame.print(atributes, lim);
    }

    getCorrelations(atributes?) {
        this.calculateCorrelations();
        return DataFrameFactory(this.procesedData.correlations).print(atributes);
    }

    getCustomData(data, atributes?) {
        return DataFrameFactory(data).print(atributes);
    }

    calculateMetrics() {
        if (this.procesedData.univarsMetrics.length == 0) {
            this.procesedData.univarsMetrics = this.univariableMetricsService.calculateMetrics(this.procesedData.attributesSeparated);
        }
        return this.procesedData.univarsMetrics;
    }
    
    calculateCorrelations() {
        this.calculateMetrics();
        if (this.procesedData.correlations.length == 0) {
            this.procesedData.correlations = this.correlationsService.getCorrelations(this.procesedData)
        }
        return this.procesedData.correlations;
    }

    

    private getAllAtributesUnidimensional(typeData) {
        const attributes: Array<any> = typeData;
        const errorDataService = this.typeDatasService.errorDataService;

        let values = {};
        
        for (let index = 0; index < attributes.length; index++) {
            const property = attributes[index].name;
            const type = attributes[index].type;
            let arrayProcesed = [];

            if (type === 'Number') {
                this.data.map(a => {
                    const currentValue = a[property];
                    if (!errorDataService.isMissing(a[property])) {
                        arrayProcesed.push(parseFloat(a[property]));
                    }
                });
            } else {
                this.data.map(a => {
                    const currentValue = a[property];
                    if (!errorDataService.isMissing(a[property])) {
                        arrayProcesed.push(a[property]);
                    }
                });
            }
            values[property] = {};
            values[property].items = arrayProcesed;
            values[property].type = type;
        }
        return values;
    }



    getUnique(props: Array<string>) {

    }

    get(props: Array<string>) {

    }
}

export function npFactory() {
    return new NP();
}