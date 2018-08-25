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
    console.log('----------------------------------------------------');
    console.log("ID | Product Name | Department | Price | Stock");
    res.forEach(element => {
      console.log(element.item_id + " | " +
        element.product_name + " | " +
        element.department_name + " | $" +
        element.price + " | " +
        element.stock_quantity);
    });
    console.log('----------------------------------------------------');
    managerOptions(res);
  });
};
let managerOptions = (res) => {
  inquirer.prompt([{
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['Add new item', 'Update item qty', 'show items', 'Quit']
  }]).then(function (answer) {
    if (answer.choice == 'Add new item') {
      addItem();
    };
    if (answer.choice == 'Update item qty') {
      updateItem(res);
    }
    if (answer.choice == 'show items') {
      showTable();
    }
    if (answer.choice == 'Quit') {
      connection.end();
    };
  });
};
let addItem = () => {
  inquirer.prompt([{
      type: 'input',
      name: 'productname',
      message: 'What is the name of the product?'
    },
    {
      type: 'input',
      name: 'departmentname',
      message: 'What depatment is it in?'
    },
    {
      type: 'input',
      name: 'price',
      message: 'how much does it cost?'
    },
    {
      type: 'input',
      name: 'stock',
      message: 'how much do we have in stock?'
    }
  ]).then(function (value) {
    console.log("adding");
    connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" + value.productname + "','" + value.departmentname + "'," + value.price + "," + value.stock + ");", function (err, res) {
      if (err) throw err;
      console.log(value.productname + " Has been added to Bamazon");
      managerOptions();
    });
  });
};
let updateItem = (res) => {
  inquirer.prompt([{
      type: 'input',
      name: 'productname',
      message: 'What product would you like to update?'
    },
    {
      type: 'input',
      name: 'added',
      message: 'How much stock would you like to add?'
    }
  ]).then(function (answer) {
    res.forEach((element, i) => {
      if(element.product_name == answer.productname){
        connection.query('UPDATE products SET stock_quantity = (stock_quantity +'+answer.added+ ') WHERE item_id='+element.item_id+';', function(err, res){
          if (err) throw err;
          if(res.affectedRows ==0){
            console.log('notting happened');
            showTable();
          } else {
            console.log('item updated');
            showTable();
          }
        });
      } else {
      }
    });
  });
};