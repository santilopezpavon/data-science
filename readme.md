# The project
This is a TS project for Machine Learning.

# Compile and init the project.

After clone the project, please execute this commands:
```bash
npm install
npm run tsc
``` 

# Read and save a csv

## Read a CSV
```javascript
// Import
import ReadData from "./features/ReadData/ReadData";

// The path of the csv
const fileHousePrice = "./../../machine-learning/data/hose-price-test.csv";

// New instance of ReadData object, with the path of the csv and the separator.
const readData = new ReadData(fileHousePrice, ",");

// Call to loadCsv function, and pass a callback, the callback get for parameter the CSV converted in JSON.
readData.loadCSV(fileReaded);
function fileReaded(results: any) {
    // Do something with the JSON.
}
```
## Save a CSV
In the previous example, inside the callback fileReaded you can dos modifications and operations with the data obtained by the csv.

After do this modifications you can save in new csv with the function saveCsv, the first parameter is a new array of JSON objects, the second parameter are the name of the new file and the last paramater a callback.

```javascript
function fileReaded(results: any) {
    // Do something with the JSON.
    readData.saveCSV(results, "results", function () {
        console.log("FIN");
    }); 
}
```


# Auxiliar Documentation.
## Compile on save
This is a documentation for Visual Studio Code if you wish execute a command after save a file.

You need to install the emeraldwalk extension, is called "Run on save".

After you need execute Command + Shift + P and open Workspace Settings (JSON), this is a file settings.json inside the .vscode directory.

And add:

```javascript
{
    .....
    "emeraldwalk.runonsave": {
    
        "commands": [           
            {
                "match": "\\.ts$",
                "cmd": "npm run tsc"
            }
        ]
    },
    .....
}
```
## Create a basic project for TS.
This article explains how create a basic project for TS.
https://medium.com/@diegoguevaraco/typescriptconnodejs-dbaa83b2c3f3