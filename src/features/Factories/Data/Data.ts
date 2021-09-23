import {npFactory} from "../../Calculus/np";
import {DataFrameFactory} from "../../VisualizeData/DataFrame";

/**
 * Set data for do operations.
 * @param {Array<any>} data the array of json data objects.
 * @returns {void} 
 */
export function setData(data) {
    const np = npFactory();  
    np.setData(data);
}

/**
 * Get the data.
 * @returns {Array<any>} the data Array with all Json Objects.
 */
export function getData() {
    const np = npFactory();  
    return np.getData();
}

export function getInfo() {
    const np = npFactory();  
    return np.getAttributes();
}

export function getDescribe() {
    const np = npFactory();  
    return np.calculateMetrics();
}

export function getUnique(atributes = []) {
    const np = npFactory(); 
    return np.getUnique(atributes)
}   

export function head(atributes = [], lim = 5) {
    const np = npFactory();  
    const data = np.getData();
    return DataFrameFactory(data).print(atributes, lim);      
}

export function info() {
    const np = npFactory(); 
    const attributes = np.getAttributes();
    return DataFrameFactory(attributes).print();      
}

export function describe(atributes = [], lim = 10) {
    const np = npFactory(); 
    return DataFrameFactory(np.calculateMetrics()).print(atributes, lim);
}

export function unique(atributes = []) {
    const np = npFactory(); 
    const uniques = np.getUnique(atributes)
    console.log(uniques);
}   

export function correlations(atributes = []) {
    const np = npFactory(); 
    const correlations = np.getCorrelations(atributes)
    if(atributes.length === 0) {
        correlations.sort(function (a, b) {
            if (a.correlation > b.correlation) {
              return -1;
            }
            if (a.correlation < b.correlation) {
              return 1;
            }
            // a must be equal to b
            return 0;
          });
        return DataFrameFactory(correlations).print(atributes);
    } else {
        let response = [];
        const attributesInteranl = np.getAttributes();
        attributesInteranl.forEach(function (attr) {
            if(attr.type === 'Number') {
                response.push({
                    "prop": attr.name
                });
            }
        });
        response.forEach(function (attr) {
            for (let i = 0; i < atributes.length; i++) {
                const element = atributes[i];
                attr[element] = np.getCorrelation(attr.prop, element);
            }
        });
        return DataFrameFactory(response).print();
  
    }
}   