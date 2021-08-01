const dfd = require("danfojs-node");

const housing = "./../machine-learning/data/housing.csv";
const vgSales = "./../machine-learning/data/vgsales.csv";

dfd.read_csv(vgSales) //assumes file is in CWD
  .then(df => {
    console.log(df);
   df.head().print()
   df.describe().print();
    console.log(getMethods(df));
  }).catch(err=>{
     console.log(err);
  })
  getMethods = (obj) => Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function')