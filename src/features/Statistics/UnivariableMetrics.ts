import { mean, std } from "mathjs";
declare var require: any

const Math = require('mathjs')
const skewness = require('compute-skewness');
const kurtosis = require('compute-kurtosis');


export class UnivariableMetrics {

    private static instance: UnivariableMetrics

    private constructor() { }

    public static getInstance(): UnivariableMetrics {
        if (!UnivariableMetrics.instance) {
            UnivariableMetrics.instance = new UnivariableMetrics()
        }
        return UnivariableMetrics.instance
    }

    calculateMetrics(data: object) {
        let calculates: Array<object> = [];
        for (const property in data) {
            const currentProp = data[property];
            if (currentProp.type === 'Number') {
                let prepareCalculates: object = {};
                prepareCalculates["name"] = property;

                //console.time('sorted');
                const sorted = this.sortValues(currentProp.items);
                //console.timeEnd('sorted')
                
                const iqr = this.iqr(sorted);
                const max = sorted[sorted.length - 1];
                const min = sorted[0];

                prepareCalculates["mean"] = this.getMean(sorted);
                prepareCalculates["median"] = this.getMedian(sorted);
                prepareCalculates["mode"] = this.getMode(sorted);
                prepareCalculates["iqr"] = iqr.rango;
                prepareCalculates["first"] = iqr.primer;
                prepareCalculates["third"] = iqr.tercer;
                prepareCalculates["max"] = max;
                prepareCalculates["min"] = min;
                prepareCalculates["std"] = Math.std(sorted);

                const intervals = this.getIntervals(prepareCalculates);
                const percentDataIntervals = this.getAtipicDataPercentInIntervals(intervals, sorted);
                for (let index = 0; index < percentDataIntervals.length; index++) {
                    prepareCalculates["interv_" + (index + 1)] = percentDataIntervals[index];

                }
                //console.time('sorted');
                prepareCalculates["skewness"] = skewness(sorted);
                prepareCalculates["kurtosis"] = kurtosis(sorted);
               // console.timeEnd('sorted')

                calculates.push(prepareCalculates);


            }
        }
        return calculates;
    }

    sortValues(data: Array<number>) {
        return data.sort(function (a, b) {
            return a - b;
        });
    }

    getIntervals(prepareCalculates) {
        const media = prepareCalculates.mean;
        const std = prepareCalculates.std;

        let intervals = [];
        for (let i = 1; i <= 3; i++) {
            intervals[i - 1] = [media - std * i, media + std * i];
        }
        return intervals;
    }

    getAtipicDataPercentInIntervals(intervals, data) {
        let percentDataInterval = [];
        const numItemsData = data.length;
        for (let i = 0; i < intervals.length; i++) {
            const interval = intervals[i];
            const itemsInterval = data.filter(function (value) {
                if (value > interval[0] && value < interval[1]) {
                    return true;
                }
            });
            percentDataInterval[i] = itemsInterval.length / numItemsData * 100;
        }
        return percentDataInterval;
    }

    getStd(data: Array<number>) {
        try {
            return Math.std(data);
        } catch (error) { }
        return null;

    }
    getMode(data: Array<number>) {
        try {
            return Math.mode(data);
        } catch (error) { }
        return null;
    }

    getMean(data: Array<number>) {
        try {
            return Math.mean(data);
        } catch (error) { }
        return null;
    }


    getMedian(data: Array<number>) {
        const longitudDatos = data.length;
        let puntoMedio: number = Math.floor(longitudDatos / 2);
        if (longitudDatos % 2 === 0) {
            let puntoMedioA: number = Math.ceil(longitudDatos / 2);
            let puntoMedioB: number = puntoMedioA - 1;
            return (
                data[puntoMedioA] + data[puntoMedioB]
            ) / 2;
        }
        return data[puntoMedio];
    }

    iqr(data: Array<number>) {
        const longitudDatos = data.length;
        let primerCuartil = null;
        let tercerCartil = null;
        if (longitudDatos % 2 === 0) {
            let mitad = longitudDatos / 2;
            let primeraSeccion = data.slice(0, mitad);
            let segundaSeccion = data.slice(mitad);
            primerCuartil = this.getMedian(primeraSeccion);
            tercerCartil = this.getMedian(segundaSeccion);
        } else {
            let mitad = Math.floor(longitudDatos / 2);
            let primeraSeccion = data.slice(0, mitad);
            let segundaSeccion = data.slice(mitad + 1);
            primerCuartil = this.getMedian(primeraSeccion);
            tercerCartil = this.getMedian(segundaSeccion);
        }
        return {
            "primer": primerCuartil,
            "tercer": tercerCartil,
            "rango": tercerCartil - primerCuartil
        }
    }

}


export function univariableMetricsFactory() {
    return UnivariableMetrics.getInstance();
}