const mysql = require("mysql");
const inquirer = require("inquirer");
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Turner@88",
  database: "bamazon"
});
connection.connect(function (err) {
  if (err) throw err;
  showTable();
});
let showTable = () => {
  connection.query("SELECT * FROM products", (err, res) => {
    console.log("ID | Product Name | Department | Price | Stock");
    res.forEach(element => {
      console.log(element.item_id + " | " +
        element.product_name + " | " +
        element.department_name + " | $" +
        element.price + " | " +
        element.stock_quantity);
    });
    customerOptions(res);
  });
};
let customerOptions = (res) => {
  inquirer.prompt([{
    type: 'input',
    name: 'choise',
    message: '\nWhat would you like to purchase? Press Q to quit.\n'
  }]).then(function (answer) {
    let correct = false;
    if (answer.choise.toUpperCase() == "Q") {
      process.exit();
    };
    res.forEach((element, i) => {
      if (element.product_name == answer.choise) {
        correct = true;
        let product = answer.choise;
        let id = i;
        inquirer.prompt({
          type: 'input',
          name: 'qty',
          message: 'How many would you like to order?',
          validate: function (value) {
            if (isNaN(value) == false) {
              return true;
            } else {
              return false;
            }
          }
        }).then(function (answer) {
          if ((res[id].stock_quantity - answer.qty) > 0) {
            connection.query("UPDATE products SET stock_quantity=?'" + (res[id].stock_quantity - answer.qty) + "'WHERE product_name=?'" + product + "'", function (err, res2) {
              console.log("Product Bought!");
              showTable();
            });
          } else {
            console.log('Insufficient stock');
            customerOptions(res);
          };
        });
      };
      if (i == res.length-1 && correct == false) {
        console.log('Not a valid selection');
        customerOptions(res);
      };
    });
  });
};