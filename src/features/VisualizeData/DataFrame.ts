declare var $$;
declare function require(name: string);
const Table = require('cli-table');
import { config } from "./../../config";

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

    print(cols?: Array<string>, limItems?: number) {
        
        const table = this.createTable(cols, limItems);
        const tableObject = table.tableObject;
        const limited = table.limited;

        if (config.visualization === 'html') {
            this.printForHtml(tableObject);
        } else {
            this.printForConsole(tableObject);
        }

        if (limited === true) {
            console.log("LIMITED");
        }

        var namesCols = "";
        for (const key in this.data[0]) {
            namesCols += key + ", ";
        }
        console.log(namesCols);
    }

    private printForConsole(tableObject:any) {  
        console.log(tableObject.toString());        
    }

    private printForHtml(tableObject:any) {        
        const head = tableObject.options.head;
        const bodyLength = tableObject.length;

        let tableHtml = '<table style="width:auto;" class="table"><thead><tr>';
        
        for (let i = 0; i < head.length; i++) {            
            tableHtml += "<td>" + head[i] + "</td>";            
        }

        tableHtml += "</tr></thead><tbody>";
        for (let index = 0; index < tableObject.length; index++) {
            const element = tableObject[index];
            tableHtml += "<tr>"
            for (let j = 0; j < element.length; j++) {
                tableHtml += "<td>" + element[j] + "</td>";
            }
            tableHtml += "</tr>"
            
        }
        tableHtml += "</tbody></table>";
        $$.html(tableHtml);        

    }

    

    private createTable(cols?: Array<string>, limItems?: number, defaultLim:number = 8) {
        // Ini Custom Table.
        let customTable = {
            head: ["Index"],
            colWidths: [8]
        };
        // Lim Cols.
        let lim = defaultLim;
        let count = 0;

        let limited = false; // The table are limited?

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

        return {
            tableObject: tableObject,
            limited: limited
        };
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