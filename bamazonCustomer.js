const mysql = require('mysql');

const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });

function displayTable(){

    let tableName = 'products'
    let columns = ['item_id','product_name','price'];
    connection.query('select ?? from ??',[columns,tableName],(error, results)=>{
        if(error) throw error;

        // let index = [];
        // let resObject = {};
        // resObject.Item_ID = results[0].item_id;
        console.table(results);
        // console.table(resObject);
        connection.end();
        askInitialQuestions();

    });
}

function askInitialQuestions(){
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
    ]).then((answers)=>{

        let ID= answers.getID;
        let quantity = answers.getquantity;

        checkDB(ID,quantity);

    }).catch((error)=>{
        console.log(error);
    })
}

function checkDB(ID,quantity){
    console.log('hi');  
}

displayTable();