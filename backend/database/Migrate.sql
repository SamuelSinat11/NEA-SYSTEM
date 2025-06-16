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
    type varchar(120) DEFAULT NULL 
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

