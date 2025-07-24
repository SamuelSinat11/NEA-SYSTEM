// Authication 

CREATE TABLE role ( 
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    code VARCHAR(120) NOT NULL
); 

INSERT INTO role (name, code) VALUES 
('Admin', 'admin'),
('Manager', 'Manager'), 
('User', 'user');


CREATE TABLE users ( 
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    role_id int(11) DEFAULT NULL,
    name VARCHAR(120) DEFAULT NULL,
    username VARCHAR(120) DEFAULT NULL UNIQUE,
    password VARCHAR(255) DEFAULT NULL, 
    is_active TINYINT(1) DEFAULT NULL, 
    create_by VARCHAR(120) DEFAULT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
); 

-- Assign foreign key 
ALTER TABLE users ADD FOREIGN KEY (role_id) REFERENCES role(id);

-- Join Data 
SELECT u.*, r.name as role_name FROM users u INNER JOIN role r ON (u.role_id = r.id);

-- Query 
SELECT 
u.id, 
u.name, 
u.username,
u.is_active,
r.name AS role_name
FROM users u
INNER JOIN role r ON (u.role_id = r.id);


-- customer 
CREATE TABLE customer (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    name varchar(120) DEFAULT NULL, 
    tel varchar(18) NOT NULL UNIQUE, 
    email varchar(120) DEFAULT NULL UNIQUE, 
    address text DEFAULT NULL, 
    type varchar(120) DEFAULT NULL,  
    create_by varchar(120) DEFAULT NULL, 
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
); 

-- Relationship 
ALTER TABLE users 
ADD FOREIGN KEY (role_id) REFERENCES role(id);

ALTER TABLE product 
ADD FOREIGN KEY (category_id) REFERENCES category(id); 

ALTER TABLE product_image
ADD FOREIGN KEY (product_id) REFERENCES product(id);

ALTER TABLE `order` 
ADD FOREIGN KEY (customer_id) REFERENCES customer(id);

ALTER TABLE `order` 
ADD FOREIGN KEY (user_id) REFERENCES users(id);


ALTER TABLE `order_detail`
ADD FOREIGN KEY (order_id) REFERENCES `order`(id); 

ALTER TABLE `order_detail`
ADD FOREIGN KEY (product_id) REFERENCES `product`(id); 


ALTER TABLE `purchase`
ADD FOREIGN KEY (supplier_id) REFERENCES `supplier`(id); 


ALTER TABLE purchase_product
ADD FOREIGN KEY (purchase_id) REFERENCES  `purchase`(id); 

ALTER TABLE `purchase_product`
ADD FOREIGN KEY (product_id) REFERENCES  `product`(id); 

ALTER TABLE `expense`
ADD FOREIGN KEY (expense_type_id) REFERENCES expense_type(id); 


-- supplier 
CREATE TABLE supplier (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    name varchar(18) NOT NULL, 
    code varchar(18) NOT NULL UNIQUE, 
    tel varchar(18) NOT NULL UNIQUE, 
    email varchar(18) DEFAULT NULL, 
    address text DEFAULT NULL, 
    website varchar(120) DEFAULT NULL, 
    note text DEFAULT NULL, 
    create_by varchar(120) DEFAULT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
); 

-- category 
CREATE TABLE category ( 
    id int(11) NOT NULL, 
    name varchar(255) NOT NULL, 
    description text DEFAULT NULL,
    status tinyint(1) NOT NULL, 
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()    
)

-- product 
CREATE TABLE product (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    category_id int(11) NOT NULL, 
    name varchar(120) NOT NULL, 
    brand varchar(120) NOT NULL, 
    description text DEFAULT NULL, 
    qty int(6) DEFAULT 0 NOT NULL, 
    price DECIMAL(7,2) DEFAULT 0 NOT NULL, 
    discount DECIMAL(3,2) DEFAULT 0 NOT NULL, 
    status tinyint(1) DEFAULT 0, 
    image varchar(255) DEFAULT NULL, 
    create_by varchar(120) DEFAULT NULL, 
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
); 

-- product image 
CREATE TABLE product_image (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    product_id int (11), 
    image varchar(255) NOT NULL
); 

-- order 
CREATE TABLE `order` (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    order_no varchar(120) NOT NULL, 
    customer_id int(11) DEFAULT NULL, 
    user_id int(11) DEFAULT NULL, 
    paid_amount DECIMAL(7,2) DEFAULT 0 NOT NULL, 
    payment_method varchar(120) NOT NULL, 
    remark text DEFAULT NULL, 
    create_by varchar(120) DEFAULT NULL, 
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
); 

-- order_detail 
CREATE TABLE order_detail ( 
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    order_id int(11), 
    product_id int(11), 
    qty int(6) DEFAULT 0, 
    price DECIMAL(7,2) DEFAULT 0, 
    discount DECIMAL(7,2) DEFAULT 0, 
    total DECIMAL(7,2) DEFAULT 0
); 


-- purchase 
CREATE TABLE purchase (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    supplier_id int(11), 
    ref varchar(255) NOT NULL, 
    shipp_company varchar(255) DEFAULT NULL, 
    paid_cost DECIMAL(7,2) DEFAULT 0, 
    paid_date datetime, 
    status varchar(120) DEFAULT NULL, 
    create_by varchar(120) DEFAULT NULL, 
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
); 


-- purchase product 
CREATE TABLE purchase_product (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    purchase_id int(11), 
    product_id int(11), 
    qty int(11) DEFAULT 0, 
    cost DECIMAL(7,2) DEFAULT 0, 
    discount DECIMAL(7,2) DEFAULT 0, 
    amount DECIMAL (7,2) DEFAULT 0, 
    retail_price DECIMAL(7,2) DEFAULT 0, 
    remark text DEFAULT NULL, 
    status varchar(120) DEFAULT NULL, 
    create_by varchar(120) DEFAULT NULL, 
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
); 


-- expense_type 
CREATE TABLE expense_type (
    id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    name varchar(255) NOT NULL, 
    code varchar(255) NOT NULL
); 

-- expense 
CREATE TABLE expense (
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    expense_type_id INT(11), 
    ref_no VARCHAR(255) NOT NULL, 
    name varchar(255) NOT NULL, 
    amount DECIMAL(7,2) DEFAULT 0,
    remark TEXT DEFAULT NULL, 
    expense_date datetime, 
    create_by varchar(120) DEFAULT NULL, 
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP()
); 


-- Record Test 
INSERT INTO `category`(`id`, `name`, `description`, `status`, `create_at`) VALUES
(1, 'Electronics', 'Devices and gadgets', 'Active', NOW()),
(2, 'Furniture', 'Home and office furniture', 'Active', NOW()),
(3, 'Clothing', 'Men and women apparel', 'Active', NOW()),
(4, 'Books', 'Various genres of books', 'Active', NOW()),
(5, 'Sports', 'Sports equipment and accessories', 'Active', NOW()),
(6, 'Beauty', 'Cosmetics and skincare products', 'Active', NOW()),
(7, 'Toys', 'Children’s toys and games', 'Active', NOW()),
(8, 'Automotive', 'Car parts and accessories', 'Active', NOW()),
(9, 'Groceries', 'Daily food and beverage items', 'Active', NOW()),
(10, 'Stationery', 'Office and school supplies', 'Active', NOW());


INSERT INTO `supplier`(`id`, `name`, `code`, `tel`, `email`, `address`, `website`, `note`, `create_by`, `create_at`) VALUES
(1, 'Supplier A', 'SUP-A', '012345678', 'a@example.com', 'Address A', 'www.suppliera.com', 'First supplier', 'Admin', NOW()),
(2, 'Supplier B', 'SUP-B', '023456789', 'b@example.com', 'Address B', 'www.supplierb.com', 'Second supplier', 'Admin', NOW()),
(3, 'Supplier C', 'SUP-C', '034567890', 'c@example.com', 'Address C', 'www.supplierc.com', 'Third supplier', 'Admin', NOW()),
(4, 'Supplier D', 'SUP-D', '045678901', 'd@example.com', 'Address D', 'www.supplierd.com', 'Fourth supplier', 'Admin', NOW()),
(5, 'Supplier E', 'SUP-E', '056789012', 'e@example.com', 'Address E', 'www.suppliere.com', 'Fifth supplier', 'Admin', NOW()),
(6, 'Supplier F', 'SUP-F', '067890123', 'f@example.com', 'Address F', 'www.supplierf.com', 'Sixth supplier', 'Admin', NOW()),
(7, 'Supplier G', 'SUP-G', '078901234', 'g@example.com', 'Address G', 'www.supplierg.com', 'Seventh supplier', 'Admin', NOW()),
(8, 'Supplier H', 'SUP-H', '089012345', 'h@example.com', 'Address H', 'www.supplierh.com', 'Eighth supplier', 'Admin', NOW()),
(9, 'Supplier I', 'SUP-I', '090123456', 'i@example.com', 'Address I', 'www.supplieri.com', 'Ninth supplier', 'Admin', NOW()),
(10, 'Supplier J', 'SUP-J', '091234567', 'j@example.com', 'Address J', 'www.supplierj.com', 'Tenth supplier', 'Admin', NOW());
