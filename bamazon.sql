DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price decimal(10,4) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);
INSERT INTO products
(product_name, department_name, price, stock_quantity)
VALUES
("Samsung Galaxy", "Electronics", 99, 11),
("Ready Player One", "Books", 10, 12),
("Vertical Garden Planting", "Garden", 20, 13),
("Soylent Meal Replacement", "Food", 50, 14),
("Ketones for Ketogenic Diet", "Food", 5, 15),
("Acoustic Guitar", "Music", 67, 16),
("Ipod", "Music", 10, 17),
("HTC VIVE", "Game", 20, 18),
("PS4", "Game", 26, 19),
("Xbox One S", "Game", 71, 20);