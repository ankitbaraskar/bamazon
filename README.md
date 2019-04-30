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



***Initially, the DB data looks like:***

![](images/initial%20table%20results.png?raw=true)




2. `Pick an item to order`

From the list of products displayed, pick an Item ID to order and enter it into the prompt:

![](images/type%20item%20id.png?raw=true)




3. `Enter amount and place order`

Enter quantity required and hit enter to place the order. If enough stock is available, the order will be successful and it will display your total cost.

![](images/quantity%20and%20display%20cost.png?raw=true)



***DB will be updated with the new stock amount:***

![](images/number%20update%20in%20DB.png?raw=true)



4. `Place an invalid order`


