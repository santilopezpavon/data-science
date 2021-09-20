import { typeOf } from "mathjs";

declare function require(name: string);
const Table = require('cli-table');

export class DataFrame {
    data: Array<any>;

    constructor(data: Array<any>) {
        this.data = data;
    }

    getAllCols() {
        console.log("See All Cols");
        for (const key in this.data[0]) {
            console.log(key);
        }
        console.log("End See All Cols");
    }

    printForConsole(cols?: Array<string>, limItems?: number) {
        let customTable = {
            head: ["Index"],
            colWidths: [8]
        };
        let lim = 8;
        let count = 0;

        let limited = false;

        let existeCols = false;
        if (cols && cols.length > 0) {
            lim = 20;
            existeCols = true;
        }


        const numCols = this.getNumCols(lim, cols);
        let widthColumns = this.getWithCols(numCols);

        for (const key in this.data[0]) {
            if (existeCols === true && cols.indexOf(key) !== -1) {
                customTable.head.push(key);
                customTable.colWidths.push(widthColumns);
                count++;
            } else if (existeCols === false) {
                customTable.head.push(key);
                customTable.colWidths.push(widthColumns);
                count++;
            }
            if (count >= lim) {
                limited = true;
                break;
            }
        }




        let tableObject = new Table(customTable);

        if (limItems && limItems >= this.data.length) {
            limItems = this.data.length;
        } else if (typeof (limItems) === 'undefined') {
            limItems = this.data.length;
        }

        for (let index = 0; index < limItems; index++) {
            const element = this.data[index];
            let dataRow = [index];
            for (let j = 1; j < customTable.head.length; j++) {
                const dataPrint = element[customTable.head[j]];
                dataRow.push(dataPrint);

            }

            tableObject.push(dataRow);
        }
        console.log(tableObject.toString());
        if (limited === true) {
            console.log("LIMITED");
        }

        var namesCols = "";
        for (const key in this.data[0]) {
            namesCols += key + ", ";
        }
        console.log(namesCols);
    }

    printForHtml(cols?: Array<string>, limItems?: number) {
        let table = '<table class="table"><thead><tr>';
        for (const key in this.data[0]) {
            table += "<th>" + key + "</th>";
        }
        table += "</tr></thead><tbody>";

        for (let index = 0; index < this.data.length; index++) {
            const element = this.data[index];
            table += "<tr>"
            for (const key in this.data[0]) {
                table += "<td>" + element[key] + "</td>";
            }
            table += "</tr>"         
        }
        table += "</tbody></table>";
       
        $$.html(table);
    }

    print(cols?: Array<string>, limItems?: number) {
        this.printForHtml(cols, limItems);
    }

    private getNumCols(lim, cols?) {
        let count = 0;

        if (cols && cols.length > 0) {
            count = cols.length;
        } else {
            for (const key in this.data[0]) {
                count++;
            }
        }


        if (count > lim) {
            return lim;
        }
        return count;
    }


    private getWithCols(numCols) {
        return Math.round(100 / numCols);
    }
}

export function DataFrameFactory(data: Array<any>) {
    return new DataFrame(data);
}