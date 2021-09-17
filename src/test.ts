declare function require(name: string);
const panda = require("./features/Factories");
const fs = require('fs');

/**
 * Leer y guardar Ficheros.
 */
const fileHousePrice = "./../../machine-learning/data/hose-price-test.csv";
panda.read_csv(fileHousePrice).then( function (res) {
   // console.log(res);
});

const jsonObject = {"saludo": "hola"};
panda.save_csv("./../file", jsonObject);

/**
 * 
 */
panda.read_csv(fileHousePrice, ",").then( function (results) {
   /* const df = panda.calc();
    df.setData(results);
  
   */
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

    const df = panda.calc();
    df.setData(results);
    df.describe(["median", "kurtosis"]);


 });
 