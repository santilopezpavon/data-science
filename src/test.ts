declare function require(name: string);
declare var process;
const panda = require("./features/Factories");
const fs = require('fs');


/**
 * Leer y guardar Ficheros.
 */
/*const fileHousePrice = "./../../machine-learning/data/hose-price-test.csv";
panda.read_csv(fileHousePrice).then(function (res) {
   // console.log(res);
});*/

//const jsonObject = {"saludo": "hola"};
//panda.save_csv("./../file", jsonObject);

/**
 * 
 */
const housing = "./../../machine-learning/data/housing.csv";

panda.read_csv(housing, ",").then(function (results) {
  // const df = panda.calc();
   panda.setData(results);
   //console.log(panda.getInfo());
   panda.correlations(["median_house_value"]);
   //panda.head(["median_income", "median_house_value"], 20);
   // panda.describe(["name","interv_1", "interv_2", "interv_3"]);  
    //panda.describe(["name","mean", "first", "median", "third", "min", "max"]);  
    //panda.describe(["name", "tukeyminextreme", "tukeymaxextreme", "min", "max", "atipicdataextreme"]);  
    
    /*panda.describe(["name", "tukeyminextreme", "tukeymaxextreme", "min", "max"]);  
    memoryCalculate("describe");
    panda.correlations(["median_house_value"]);
    memoryCalculate("correlations");*/

/*
    let data = panda.getData();
    data.map(function (item) {
      if(
        !panda.isMissing(item, "median_income") && 
        panda.isAtipicalData("median_income", item["median_income"])
      ) {
        const value = item.median_income;
        //console.log(value);
        if(value > 1000){
          item.median_income = (item.median_income / 1000) + ""
        }
      } 
    })


    panda.setData(data);
    panda.describe(["name", "tukeyminextreme", "tukeymaxextreme", "min", "max"]);  
    panda.correlations(["median_house_value"]);*/
  //console.log(panda.isAtipicalData("median_income", 2));



    /*const data = panda.getData();
    data.map(function (item) {
      if(
        !panda.isMissing(item, "median_income")
      ) {

      }
    });*/
    // console.log(panda.getData());
   //panda.info();
   //panda.getUnique(["ocean_proximity"]);
   //console.log(df.getData());
   //panda.removeAttributes(["PoolQC"]);
   /*df.infoAtributes();
   panda.removeAttributes(["MSSubClass"]);
   df.infoAtributes();*/

   /*const saludo2 = "hola2";
    var myString = 'const saludo = "hola"; console.log(saludo2)';
    eval(myString);*/
   //panda.removeAttributes(df, ["PoolQC"]);
   // df.infoAtributes();
   /***console.log(df.getNumData());
    panda.removeAttributesWithMorePercentError(df, 0.5);
    df.getData();
    //panda.removeDataWithErrors(df);
    //df.infoAtributes();
    console.log(df.getNumData());*/

   /*const df = panda.calc();
   df.setData(results);
   df.describe(["median", "kurtosis"]);
  console.log(panda.dataFrameEnv);*/

});

