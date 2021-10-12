# The project
This is a TS project for Machine Learning.

# Compile and init the project.
After clone the project, please execute this commands:
```bash
npm install
npm run tsc
``` 

# Read and save a CSV file.
## Read a CSV
```javascript
// Import
const factories = require("./features/Factories");
// The path of the csv
const fileHousePrice = "./../../machine-learning/data/hose-price-test.csv";
// New instance of ReadData object, with the path of the csv and the separator.
factories.read_csv(fileHousePrice, ",").then(function (results) {
    // The results are the data in JSON format.
});
```
## Save a CSV
For convert a JSON to CSV file we can use the save_csv function.

```javascript
const factories = require("./features/Factories");

const jsonObject = {"saludo": "hola"};
factories.save_csv("./../file", jsonObject);
```
# Methods
| Metod   | Description                                                                                           | Parameters                                               | Return                                                     |
| :------ | :---------------------------------------------------------------------------------------------------- | :------------------------------------------------------- | :--------------------------------------------------------- |
| setData | Set data for do the next operations and calcs. The data is an array of JSON objects with the entities | @param {Array<any>} data the array of json data objects. | @returns {void}                                            |
| getData | Get the data in JSON format                                                                           |                                                          | @returns {Array<any>} data the array of json data objects. |


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