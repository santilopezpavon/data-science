import {ReplaceDataFactory} from "./../../CleanData/ReplaceData";
import {NP} from "./../../Calculus/np";

export function removeDataWithErrors(df: NP) {
    const replaceData = ReplaceDataFactory(df);
    return replaceData.removeDataWithErrors();
}

export function removeAttributes(df: NP, attributes: Array<string>) {
    const replaceData = ReplaceDataFactory(df);
    return replaceData.removeAttributes(attributes);
}

export function updateDataWithErrors(df: NP, attributes: Array<string>, mode: string = "median") {
    const replaceData = ReplaceDataFactory(df);
    return replaceData.updateDataWithErrors(attributes, mode);
}

export function removeAttributesWithMorePercentError(df: NP, percent = 0.5) {
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