const show = true;
export function  memoryCalculate(pointName) {
    if(show === true ){
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`In the point ${pointName} uses approximately ${Math.round(used * 100) / 100} MB`);
    
    } 
  }
  