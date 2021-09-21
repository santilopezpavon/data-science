import {ReplaceDataFactory} from "./../../CleanData/ReplaceData";
import {npFactory, NP} from "./../../Calculus/np";

export function removeDataWithErrors() {
    const df:NP = npFactory(); 
    const replaceData = ReplaceDataFactory(df);
    return replaceData.removeDataWithErrors();
}

export function removeAttributes(attributes: Array<string>) {
    const df:NP = npFactory(); 
    const replaceData = ReplaceDataFactory(df);
    return replaceData.removeAttributes(attributes);
}

export function updateDataWithErrors(attributes: Array<string>, mode: string = "median") {
    const df:NP = npFactory(); 
    const replaceData = ReplaceDataFactory(df);
    return replaceData.updateDataWithErrors(attributes, mode);
}

export function removeAttributesWithMorePercentError(percent = 0.5) {
    const df:NP = npFactory(); 
    const attributes:Array<any> = df.getAttributes();

    let attributesForRemove = [];
    if(attributes && attributes.length > 0) {
        attributes.forEach(element => {
            if(element.percentError > percent) {
                attributesForRemove.push(element.name) ;
            }
        });
    }

    if(attributesForRemove.length > 0) {
        const replaceData = ReplaceDataFactory(df);
        replaceData.removeAttributes(attributesForRemove);
    }
}