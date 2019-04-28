const mysql = require('mysql');

const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

function displayTable() {

    let tableName = 'products'
    let columns = ['item_id', 'product_name', 'price'];
    connection.query('select ?? from ??', [columns, tableName], (error, results) => {
        if (error) throw error;

        console.table(results);
        console.log('\n------------ Please enter numbers only ------------\n');
        askInitialQuestions();

    });
}

function askInitialQuestions() {
    inquirer
        .prompt([
            {
                name: "getID",
                type: "input",
                message: "What is the Item ID you would like to order?",
                validate: (input) => {
                    return !isNaN(parseFloat(input)) && isFinite(input);
                }
            },
            {
                name: "getquantity",
                type: "input",
                message: "How many would you like?",
                validate: (input) => {
                    return !isNaN(parseFloat(input)) && isFinite(input);
                }
            }
        ]).then((answers) => {

            let ID = answers.getID;
            let quantity = answers.getquantity;

            checkDB(ID, quantity);

        }).catch((error) => {
            console.log(error);
        })
}

function checkDB(ID, quantity) {

    let searchQuantity = quantity;

    let tableName = 'products';
    let search = {item_id:ID}

    connection.query('select * from ?? where ?', [tableName,search], (error, results) => {
        if (error) throw error;
        const stockQuantity = results[0].stock_quantity;

        // console.log(results);
        
        if (searchQuantity>stockQuantity){
            console.log('\nInsufficient quantity!\n');
        }
        else if (searchQuantity <= stockQuantity){
            console.log('\nyou may order fosho\n');
        }
        
        connection.end();
    });    
}

displayTable();