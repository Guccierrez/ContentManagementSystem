DROP DATABASE IF EXISTS Gucci_db;
CREATE DATABASE Gucci_db;

use Gucci_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);
CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary decimal NOT NULL,
  department_id Integer
);
CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER, 
    manager_id Integer
);
INSERT INTO department (name)
VALUES 
('Board of Directors'),
('Sales'),
('Accounting'),
("HR"),
("Janitorial");

INSERT INTO role (title, salary, department_id)
VALUES
('CEO', 1000000, 1),
('Director of the Board', 900000, 1),
('Sales Lead',850000,2 ),
('Sales Intern',800000,2 ),
('Senior Accounter', 750000,3),
('Junior Accounter',700000, 3),
('Human Resources', 650000,4),
('Custodian',600000,5);



INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Cristiano', 'Ronaldo', 1, 1),
('Lionel', 'Messi', 2, null),
('Neymar', 'Jr', 3, null),
('Fernando', 'Torres', 4, null),
('Kylian', 'Mbappe', 5, null),
('Erling', 'Haaland', 6, null),
('Zlatan', 'Ibrahimovic', 7, null),
('Sergio', 'Ramos', 8, null);


SELECT * FROM Gucci_db.role;
SELECT * FROM Gucci_db.employees;
SELECT * FROM Gucci_db.department;







