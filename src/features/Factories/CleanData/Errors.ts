import {errorDataFactory} from "./../../InfoData/ErrorData";
import {npFactory} from "./../../Calculus/np";

const np = npFactory();
const errorService = errorDataFactory();

export function isMissing(item, attr) {
    return errorService.isMissing(item[attr]);
}

export function isAtipicalData(attr, value) {
    return np.isAtipicalData(attr, value);
}