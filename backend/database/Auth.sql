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