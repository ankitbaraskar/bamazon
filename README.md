# bamazon

## Customer View

### Overview

This is an Amazon-like storefront app, using node and mysql. The app will take in orders from customers and deplete stock from the store's inventory. It uses the inquirer package for user input and mysql package for SQL connections.

### Flow

1. `Start the application`

From the **bamazonCustomer.js** directory, run the following commands:
```
npm i
node bamazonCustomer.js
```

![](images/startApp.png?raw=true)

Initially, the DB data looks like:

![](images/initial%20table%20results.png?raw=true)

2. `Pick an item to order`

From the list of products displayed, pick an Item ID to order and enter it into the prompt:


