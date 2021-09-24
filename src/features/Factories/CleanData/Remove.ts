import {ReplaceDataFactory} from "./../../CleanData/ReplaceData";

export function removeAttributes(attributes: Array<string>) {
    const replaceData = ReplaceDataFactory();
    return replaceData.removeAttributes(attributes);
}

export function replaceMissingAtipicalAttributes(attributes: Array<{
    attribute:string,
    mode:string // mean, median, mode, lim, remove
    type:string // atipical || missing || all
}>){
    const replaceData = ReplaceDataFactory();
    return replaceData.replaceMissingAtipicalAttributes(attributes);
}
