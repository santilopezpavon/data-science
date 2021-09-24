import { DataFrameFactory, DataFrame } from "./../VisualizeData/DataFrame";
import { TypeDataFactory, TypeData } from "./../InfoData/TypeData"
import { univariableMetricsFactory, UnivariableMetrics } from "./../Statistics/UnivariableMetrics";
import { correlationsFactory, Correlations } from "./../Relations/Correlations";
import { memoryCalculate } from "./../../memoryConsume"

export class NP {

    data: Array<any>
    typeDatasService: TypeData
    univariableMetricsService: UnivariableMetrics
    correlationsService: Correlations

    private static instance: NP

    constructor() {
        this.typeDatasService = TypeDataFactory();
        this.univariableMetricsService = univariableMetricsFactory();
        this.correlationsService = correlationsFactory();
    }

    public static getInstance(): NP {
        if (!NP.instance) {
            NP.instance = new NP()
        }
        return NP.instance
    }


    procesedData: {
        items: {
            data: Array<any>,
            //dataFrame: DataFrame
        },
        attributes: {
            data: Array<{
                name: string,
                id: number,
                type: string,
                errorPercent: number,
                error: number
            }>,
            //dataFrame: DataFrame
        },
        attributesSeparated: object,
        univarsMetrics: Array<any>,
        correlations: Array<any>,
        notNumberUnique: any
    }

    mergeJsons(jsonA, jsonB, keyUnion) {
        jsonA.map(function (item) {
            const currentValueKeyUnion = item[keyUnion];
            const resultUnion = jsonB.find(function (itemResultSubmision) {
                return itemResultSubmision[keyUnion] === currentValueKeyUnion
            });

            if (resultUnion) {
                for (const key in resultUnion) {
                    item[key] = resultUnion[key];
                }
            }
        });
    }

    setData(data: Array<any>) {
        this.data = data;
        this.update();
    }

    update() {
        this.typeDatasService.setData(this.data);
        this.preProcessData();
    }

    getNumData() {
        return this.data.length;
    }

    getData() {
        return this.data;
    }

    private preProcessData() {
        const typeData: any[] = this.typeDatasService.getTypeDataObject();
        this.procesedData = {
            items: {
                data: this.data,
                //dataFrame: DataFrameFactory(this.data)
            },
            attributes: {
                data: typeData,
                // dataFrame: DataFrameFactory(typeData)
            },
            attributesSeparated: this.getAllAtributesUnidimensional(typeData),
            univarsMetrics: [],
            correlations: [],
            notNumberUnique: {}
        }
        const uniques = this.getAllUniqueNotNumber(typeData);
        this.procesedData.notNumberUnique = uniques;
        this.typeDatasService.updateTypeNotNumericData(uniques);

    }

    getAttributes() {
        return this.procesedData.attributes.data;
    }

    getAttibutesSeparated() {
        return this.procesedData.attributesSeparated;
    }

    getUnivarsMetrics() {
        this.calculateMetrics();
        return this.procesedData.univarsMetrics;
    }


    getCorrelations(atributes?) {
        
        this.calculateCorrelations();
        return this.procesedData.correlations;
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

    isAtipicalData(attr: string, value: any) {
        this.calculateMetrics();
        const univars = this.procesedData.univarsMetrics;
        const propCurrent = univars.filter(function (item) {
            return item.name === attr;
        });
        if (
            propCurrent[0].tukeyminextreme <= value &&
            propCurrent[0].tukeymaxextreme >= value
        ) {
            return false;
        }
        return true;
    }

    getCorrelation(propA, propB) {
        const corr = this.calculateCorrelations();
        if (propA === propB) {
            return 1;
        }
        for (let index = 0; index < corr.length; index++) {
            if (
                (corr[index].propA === propA && corr[index].propB === propB) ||
                (corr[index].propA === propB && corr[index].propB === propA)
            ) {
                return corr[index].correlation;
            }
        }
        return "NA";
    }

    getUnique(props: Array<string>) {
        let obj = {};
        for (let i = 0; i < props.length; i++) {
            if (this.procesedData.notNumberUnique.hasOwnProperty(props[i])) {
                obj[props[i]] = this.procesedData.notNumberUnique[props[i]];
            }
        }
        return obj;
    }


    private getAtributeUnidimensional(typeData, index) {
        const longitudDatos = this.data.length;

        const errorDataService = this.typeDatasService.errorDataService;
        const attributes: Array<any> = typeData;

        let arrayProcesed = [];
        for (let i = 0; i < longitudDatos; i++) {
            const a = this.data[i];
            if (!errorDataService.isMissing(a[attributes[index].name])) {
                if (attributes[index].type === 'Number') {
                    arrayProcesed.push(parseFloat(a[attributes[index].name]));
                } else {
                    arrayProcesed.push(a[attributes[index].name]);
                }
            }
        }
        return arrayProcesed;
    }

    private getAllAtributesUnidimensional(typeData) {
        const attributes: Array<any> = typeData;

        let values = {};
        const attributesLength = attributes.length;

        for (let index = 0; index < attributesLength; index++) {
            const arrayProcesed = this.getAtributeUnidimensional(typeData, index);
            values[attributes[index].name] = {
                items: arrayProcesed,
                type: attributes[index].type
            };
        }
        return values;
    }

    private getAllUniqueNotNumber(typeData: any) {
        let result = {};
        for (const key in typeData) {
            if (typeData[key].type === 'NotNumber') {
                const unique = this.calculateUnique([typeData[key].name]);
                result = { ...result, ...unique }
            }
        }
        return result;
    }


    private calculateUnique(props: Array<string>) {
        let obj = {};
        const atributesSeparated = this.procesedData.attributesSeparated;
        for (let i = 0; i < props.length; i++) {
            obj[props[i]] = [];
            const currentAttributeValues = atributesSeparated[props[i]].items;
            let objectProps = {};
            currentAttributeValues.map(function (value) {
                value = value.trim().toLowerCase();
                if (!objectProps.hasOwnProperty(value)) {
                    objectProps[value] = null;
                }
            });
            obj[props[i]] = Object.keys(objectProps);
        }

        return obj;
    }
}

export function npFactory() {
    const instancia = NP.getInstance();
    return instancia;
}