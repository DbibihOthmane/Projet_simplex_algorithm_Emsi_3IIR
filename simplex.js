class Simplex {
    constructor(matrix, b, c) {
        this.maximum = 0;
        this.isUnbounded = false;
        this.rows = matrix.length;
        this.cols = matrix[0].length;
        this.A = new Array(this.rows).fill(0).map(() => new Array(this.cols).fill(0));
        this.B = new Array(b.length);
        this.C = new Array(c.length);

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.A[i][j] = matrix[i][j];
            }
        }

        for (let i = 0; i < c.length; i++) {
            this.C[i] = c[i];
        }
        for (let i = 0; i < b.length; i++) {
            this.B[i] = b[i];
        }
    }

    simplexAlgorithmCalculataion() {
        if (this.checkOptimality() === true) {
            return true;
        }

        const pivotColumn = this.findPivotColumn();

        if (this.isUnbounded === true) {
            console.log("Error unbounded");
            return true;
        }

        const pivotRow = this.findPivotRow(pivotColumn);

        this.doPivotting(pivotRow, pivotColumn);

        return false;
    }

    checkOptimality() {
        let isOptimal = false;
        let positiveValueCount = 0;

        for (let i = 0; i < this.C.length; i++) {
            const value = this.C[i];
            if (value >= 0) {
                positiveValueCount++;
            }
        }

        if (positiveValueCount === this.C.length) {
            isOptimal = true;
            //this.print();
        }
        return isOptimal;
    }

    doPivotting(pivotRow, pivotColumn) {
        const pivotValue = this.A[pivotRow][pivotColumn];

        const pivotRowVals = this.A[pivotRow].slice();
        const pivotColVals = this.A.map(row => row[pivotColumn]);

        const rowNew = pivotRowVals.map(val => val / pivotValue);

        this.maximum = this.maximum - (this.C[pivotColumn] * (this.B[pivotRow] / pivotValue));

        for (let i = 0; i < this.cols; i++) {
            pivotRowVals[i] = rowNew[i];
        }

        this.B[pivotRow] = this.B[pivotRow] / pivotValue;

        for (let m = 0; m < this.rows; m++) {
            if (m !== pivotRow) {
                for (let p = 0; p < this.cols; p++) {
                    const multiplyValue = pivotColVals[m];
                    this.A[m][p] = this.A[m][p] - (multiplyValue * rowNew[p]);
                }
            }
        }

        for (let i = 0; i < this.B.length; i++) {
            if (i !== pivotRow) {
                const multiplyValue = pivotColVals[i];
                this.B[i] = this.B[i] - (multiplyValue * this.B[pivotRow]);
            }
        }

        const multiplyValue = this.C[pivotColumn];

        for (let i = 0; i < this.C.length; i++) {
            this.C[i] = this.C[i] - (multiplyValue * rowNew[i]);
        }

        this.A[pivotRow] = pivotRowVals;

        this.print();
        
    }

    /*print() {
        for (let i = 0; i < this.rows; i++) {
            console.log(this.A[i].join(" "));
        }
        console.log("");
    }*/

    variables_detection() {
        let locations = [];
        for (let i = 0; i < this.cols; i++) {
            let count = 0; // Reset count for each column
            for (let j = 0; j < this.rows; j++) {
                if (this.A[j] && this.A[j][i] != undefined && (this.A[j][i] == 0 || this.A[j][i] == 1)) {
                count++;
            } else {
                break; // Break if a non-0/1 value is encountered in the column
            }
            }
            if (count == this.rows) { // All elements in the column are 0 or 1
            locations.push(i); // Push column index to locations
            }
        }
        return locations;
    }

    print() {
        const tbl = document.createElement("table");
        const tblBody = document.createElement("tbody");
    
        const tblHead = document.createElement("thead");
        const headRow = document.createElement("tr");
    
        for(let i = 0; i < this.C.length ; i++) {
            const cell = document.createElement("th");
            const cellText = document.createTextNode(i < this.C.length - this.B.length ? `X${i + 1}` : `e${i + 1 - this.B.length + 1}`);
            cell.appendChild(cellText);
            headRow.appendChild(cell);
        }
        const cell_of_equal = document.createElement("th");
        const num = '=';
        const cellText_of_equal = document.createTextNode(`${num}`);
        cell_of_equal.appendChild(cellText_of_equal);
        headRow.appendChild(cell_of_equal);
        tblHead.appendChild(headRow);
        tbl.appendChild(tblHead);
    

        const row = document.createElement("tr");
        for(let i = 0 ; i < this.C.length ; i++)
        {
            const cell = document.createElement("td");
            const num = !(this.C[i] % 1 == 0) ? this.C[i].toFixed(2) : this.C[i]; 
            const cellText = document.createTextNode(`${num}`);
           // const cellText = document.createTextNode(`${this.C[i]}`);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        const cell = document.createElement("td");
        const cellText = document.createTextNode(`${this.maximum}`);
        cell.appendChild(cellText);
        row.appendChild(cell);

        tblBody.appendChild(row);



        for (let i = 0; i < this.rows; i++) {
            const row = document.createElement("tr");
            for (let j = 0; j < this.cols; j++) {
                const cell = document.createElement("td");
                //const num = !Number.isInteger(this.A[i][j]) ? this.A[i][j].toFixed(2) : this.A[i][j]; // to fixed here
                const num = !(this.A[i][j] % 1 == 0) ? this.A[i][j].toFixed(2) : this.A[i][j]; 
                const cellText = document.createTextNode(`${num}`);
                cell.appendChild(cellText);

                 // Check if the current column contains only 0's and 1's
                let isValidColumn = true;
                for (let k = 0; k < this.rows; k++) {
                    if (this.A[k][j] !== 0 && this.A[k][j] !== 1) {
                        isValidColumn = false;
                        cell.classList.add('variable_hors_base')
                    }
                }

                if (isValidColumn) {
                    cell.classList.add('variable_de_base'); // Add the CSS class 'highlight' to the cell
                }
                row.appendChild(cell);
            }
            
            const cell = document.createElement("td");
            const num = !(this.B[i] % 1 == 0) ? this.B[i].toFixed(2) : this.B[i]; 
            const cellText = document.createTextNode(`${num}`);
            //const cellText = document.createTextNode(`${this.B[i]}`);
            cell.appendChild(cellText);
            row.appendChild(cell);
            tblBody.appendChild(row);
        }
    
        tbl.appendChild(tblBody);
        const locations = this.variables_detection();
        const p = document.createElement("p");
        const what_to_print = document.createTextNode("VHB : ");
        p.appendChild(what_to_print);
        const p2 = document.createElement("p");
        const to_print = document.createTextNode("VB : ");
        p2.appendChild(to_print);
        for(let i = 0 ; i < this.C.length ; i++)
        {
           
            if(!locations.includes(i)) {
                const text_node = document.createTextNode(i < this.C.length - this.B.length ? `X${i + 1} = 0 ` : `e${i + 1 - this.B.length + 1} = 0 `);
                p.appendChild(text_node);
            }

            else {

                let index_variable_base = 0;
                
                for (let j = 0; j < this.rows; j++) {
                    if (this.A[j] && this.A[j][i] != undefined && (this.A[j][i] == 1)) {
                        index_variable_base = j;
                    } 
            
                }


                const num = !(this.B[index_variable_base] % 1 == 0) ? this.B[index_variable_base].toFixed(2) : this.B[index_variable_base]; 
                const text_node = document.createTextNode(i < this.C.length - this.B.length ? `X${i + 1} = ${num} ` 
                : `e${i + 1 - this.B.length + 1} = ${num} `);

                //const text_node = document.createTextNode(i < this.C.length - this.B.length ? `X${i + 1} = ${this.B[index_variable_base].toFixed(2)} ` 
                //: `e${i + 1 - this.B.length + 1} = ${this.B[index_variable_base].toFixed(2)} `);

                p2.appendChild(text_node);
                
                
            }
            
            
        }


        const p3 = document.createElement("p");
        const num_of_z = !(this.maximum % 1 == 0) ? this.maximum.toFixed(2) : this.maximum;
        const text_max = document.createTextNode(`Z = ${num_of_z}`);
        p3.appendChild(text_max);


        var tableContainer = document.getElementById("result-container");
        tableContainer.appendChild(tbl);
        tableContainer.appendChild(p);
        tableContainer.appendChild(p2)
        tableContainer.appendChild(p3)
        console.log(this.variables_detection());


    
    }
    

    findPivotColumn() {
        let location = 0;
        let minm = this.C[0];

        for (let i = 1; i < this.C.length; i++) {
            if (this.C[i] < minm) {
                minm = this.C[i];
                location = i;
            }
        }

        return location;
    }

    findPivotRow(pivotColumn) {
        const positiveValues = new Array(this.rows);
        const result = new Array(this.rows).fill(0);
        let negativeValueCount = 0;
        for (let i = 0; i < this.rows; i++) {
            if (this.A[i][pivotColumn] > 0) {
                positiveValues[i] = this.A[i][pivotColumn];
            } else {
                positiveValues[i] = 0;
                negativeValueCount += 1;
            }
        }
        if (negativeValueCount === this.rows) {
            this.isUnbounded = true;
        } else {
            for (let i = 0; i < this.rows; i++) {
                const value = positiveValues[i];
                if (value > 0) {
                    result[i] = this.B[i] / value;
                } else {
                    result[i] = 0;
                }
            }
        }
        let minimum = 99999999;
        let location = 0;
        for (let i = 0; i < result.length; i++) {
            if (result[i] > 0) {
                if (result[i] < minimum) {
                    minimum = result[i];
                    location = i;
                }
            }
        }
        return location;
    }

    CalculateSimplex() {
        let end = false;

        console.log("initial array(Not optimal)");
        this.print();

        console.log(" ");
        console.log("final array(Optimal solution)");

        while (!end) {
            const result = this.simplexAlgorithmCalculataion();

            if (result === true) {
                end = true;
            }
        }

       
    

        console.log("Answers for the Constraints of variables");

        for (let i = 0; i < this.A.length; i++) {
            let count0 = 0;
            let index = 0;
            for (let j = 0; j < this.rows; j++) {
                if (this.A[j][i] === 0.0) {
                    count0 += 1;
                } else if (this.A[j][i] === 1) {
                    index = j;
                }
            }

            if (count0 === this.rows - 1) {
                console.log(`variable${index + 1}: ${this.B[index]}`);
            } else {
                console.log(`variable${index + 1}: 0`);
            }
        }

        console.log("");
        console.log(`maximum value: ${this.maximum}`);
    }
}




