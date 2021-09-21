import {npFactory} from "../../Calculus/np";
import {DataFrameFactory} from "../../VisualizeData/DataFrame";


export function setData(data) {
    const np = npFactory();  
    np.setData(data);
}

export function getData() {
    const np = npFactory();  
    return np.getData();
}

export function head(atributes = [], lim = 5) {
    const np = npFactory();  
    const data = np.getData();
    const df = DataFrameFactory(data);      
    return df.print(atributes, lim);
}

export function info() {
    const np = npFactory(); 
    const attributes = np.getAttributes();
    const df = DataFrameFactory(attributes);      
    return df.print();
}

export function describe(atributes = [], lim = 10) {
    const np = npFactory(); 
    return DataFrameFactory(np.calculateMetrics()).print(atributes, lim);
}

export function getUnique(atributes = []) {
    const np = npFactory(); 
    const uniques = np.getUnique(atributes)
    console.log(uniques);
}   