import { npFactory, NP } from "./../Calculus/np";

export class AtipicalData {

    private static instance: AtipicalData

  
    public static getInstance(): AtipicalData {
        if (!AtipicalData.instance) {
            AtipicalData.instance = new AtipicalData()
        }
        return AtipicalData.instance
    }

    numAtipicalData() {
        const df:NP = npFactory(); 
        let data = df.getData();        
        const length = data.length;

        for (let i = length - 1; 0 <= i; i--) {
            
        }
    }

    

}

export function AtipicalDataFactory() {
    const instancia = AtipicalData.getInstance();
    return instancia;
}

