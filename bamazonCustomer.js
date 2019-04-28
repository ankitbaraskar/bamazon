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

    const tableName = 'products'
    const columns = ['item_id', 'product_name', 'price'];
    connection.query('select ?? from ??', [columns, tableName], (error, results) => {
        if (error) throw error;

        console.log('\n\nHere are the available products:')
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

            //  pass ID and quantity inputted by the user into this function and check the DB
            checkDB(ID, quantity);

        }).catch((error) => {
            console.log(error);
        })
}

function checkDB(ID, quantity) {
    
    //  user input's search quantity
    let searchQuantity = quantity;

    const tableName = 'products';
    let search = { item_id: ID }

    connection.query('select * from ?? where ?', [tableName, search], (error, results) => {
        if (error) throw error; 

        //  get quantity that is currently in the DB
        const stockQuantity = results[0].stock_quantity;

        // console.log(results);

        if (searchQuantity > stockQuantity) {
            console.log('\nInsufficient quantity!\n');
            setTimeout(displayTable,3000);
        }
        else if (searchQuantity <= stockQuantity) {
            // console.log('\nyou may order fosho\n');
            updateDBandGetCost(searchQuantity,results[0]);
        }

        
    });
}

function updateDBandGetCost(searchQuantity,resultsCheckDB){
    
    var newQuantity = resultsCheckDB.stock_quantity - searchQuantity;
    const cost = searchQuantity * resultsCheckDB.price;

    //  object to update the DB with the new quantity
    const setQuantity = {stock_quantity:newQuantity};
    const whereID = {item_id:resultsCheckDB.item_id};

    const tableName = 'products';

    connection.query('update ?? set ? where ?', [tableName, setQuantity,whereID], (error, results) => {
        if (error) throw error; 

        console.log (`\nYour total cost is $${cost}`);
        console.log(`\nThank you for shopping at Bamazon!\n\n\n\n`);

        setTimeout(displayTable,6000);
    });
}

displayTable();