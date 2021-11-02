/*import ReadData from "./features/ReadData/ReadData";

import { ReplaceDataFactory } from "./features/CleanData/ReplaceData"
const fileHousePrice = "./../../machine-learning/data/hose-price-test.csv";
const vgSales = "./../../machine-learning/data/vgsales.csv";
const housing = "./../../machine-learning/data/housing.csv";
const housingPrice = "./../../machine-learning/data/housing-price/test.csv";
const housingPriceSubmisions = "./../../machine-learning/data/housing-price/sample_submission.csv";*/
//const readData = new ReadData(vgSales, ",");
import { npFactory } from "./features/Calculus/np"

const fileResult = "./results.csv";

// const readData = new ReadData(housingPrice, ",");
/*const readData = new ReadData(fileResult, ",");
readData.loadCSV(fileReaded);
function fileReaded(results: any) {*/
    /*const readFileData2 = new ReadData(housingPriceSubmisions, ",").loadCSV(function (resultsSubmisions) {
        const df = npFactory();
        df.mergeJsons(results, resultsSubmisions, "Id");
        readData.saveCSV(results, "results", function () {
            console.log("FIN");
        });        
    }); */


    /**
     * 
     * 
     * \Drupal::service("read_csv")->build();
     */



    /*const df = npFactory();
    df.setData(results);
    df.infoAtributes();*/


    /* console.log(df.getNumData());
    df.infoAtributes();
    df.describe();

    const replaceService = ReplaceDataFactory(df);
    replaceService.updateDataWithErrors(["Year", "Publisher"], "median");
    df.describe(); */
    /* const replaceService = ReplaceDataFactory(df);
    replaceService.removeDataWithErrors();


    console.log(df.getNumData());
    df.infoAtributes();
    df.describe();*/

    //console.log(df.procesedData.attributes.data);
    /* df.head(["ocean_proximity"]);
     const unique = df.getUnique(["ocean_proximity"]);
     console.log("hola mundo");
     console.log(df.procesedData.notNumberUnique);
     console.log("fin"); */
    //console.log(unique);
    //console.log(df.procesedData.attributes.data);
    /*df.head();
    console.log("Describe");
    df.describe();
    df.infoAtributes();*/

    //df.getCorrelations();


    /*const correlations:any = df.calculateCorrelations();
    let filterData = correlations.filter(item => {
        if(item.correlation > 0.50 || item.correlation < -0.5) {
            return true;
        }
    });
    
    df.getCustomData(filterData);*/

    /*ReplaceDataFactory().removeDataWithErrors(results);

   //df.infoAtributes();

  // ReplaceDataFactory().removeAttributes(results, ["total_bedrooms"]);

   df.setData(results);
   const atributes:any = df.procesedData.attributes.data;
   let filterData = atributes.filter(item => {
       if(item.percentError > 0) {
           return true;
       }
   });
   console.log(filterData);*/


    /*
    const value = 50;
    const log = Math.log(value);
    
    const reverse = Math.pow(Math.E, log);
    console.log(log);
    console.log(reverse);
    
    const operacion = (Math.log(50 * 2 + 20 * 3)) / Math.log(2) 
    console.log(Math.pow(Math.E, operacion));
    console.log((50 * 2 + 20 * 3));
    
    
    const valueScale = scale(5, 10,0);
    console.log(valueScale);
    
    const valueDescale = descale(valueScale, 10,0);
    console.log(valueDescale);
    
    
    
    const operacionReal = 50 * 2 + 20 * 3;
    console.log(operacionReal);
    
    
    
    const operacionRealNo = scale(50)* scale(2) + scale(20) * scale(3);
    console.log(operacionRealNo);
    console.log(descale(operacionRealNo));
    
    
    
    function scale(x) {
        return (x - 0) / (100 - 0);
    }
    
    function descale(x) {
        return x * (100 - 0) + 0;
    }
    
    */

    //  df.procesedData.attributes.dataFrame.getAllCols();


    // df.procesedData.attributes.dataFrame.print(["name"]);
    //console.log(df.procesedData.attributesSeparated);

    //const describe = df.describe();
    //describe.print();
    //console.log(df.procesedData.attributes.data);

    /* const infoData = new InfoData(results);    
    const visualize = visualizeFactory(infoData);
   // visualize.showItems(189, 295);
    visualize.showDataTypes()
    visualize.seeUnivarsMetrics(); */

    // visualize.showDataTypes()
    //  visualize.seeUnivarsMetrics();
    // visualize.showDataTypes()
    // visualize.showSummary()
    //visualize.showDataTypes()
    //const uniques = infoData.unique(["2", "4", "1"]);
    //console.log(uniques);

    /*
        const cleanData = cleanDataFactory(infoData);
        cleanData.removeAttributesAggresive(0.5)
        cleanData.updateMissingDataNumberWithMedian();
        cleanData.removeEntitiesWithErrors();*/


    /* const cleanData = cleanDataFactory(infoData);
     cleanData.removeAttributesAggresive(0.5)
     cleanData.removeEntitiesWithErrors();
 
     visualize.showSummary()*/





    //console.log(resultData);
/*}*/

