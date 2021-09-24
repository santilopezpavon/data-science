import {errorDataFactory} from "./../../InfoData/ErrorData";
const errorService = errorDataFactory();

export function isMissing(value) {
    return errorService.isMissing(value);
}

export function isAtipicalData(attr:string, value:any) {
    return errorService.isAtipical(attr, value);
}

export function isErrorData(attr:string, value:any) {
    return isMissing(value) || isAtipicalData(attr, value);
}