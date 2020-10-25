DROP DATABASE IF EXISTS employeeTrackerDB;

CREATE DATABASE employeeTrackerDB;

USE employeeTrackerDB;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,4) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO departments (name)
VALUES("Sales");

INSERT INTO departments (name)
VALUES("Marketing");

INSERT INTO roles(title, department_id,salary)
VALUES("sales Lead", 1, "35000");

INSERT INTO roles(title, department_id,salary)
VALUES("sales person", 1, "330000");

INSERT INTO roles(title, department_id,salary)
VALUES("Account Manager", 2, "40000");


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Cristiano", "Ronaldo", 1, null);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Leo", "Messi", 1, 1);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Morgan", "Freeman", 2, null);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Appa", "Flying Bison",2, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES("Michael", "Jordan", 3, null);


SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;

SELECT first_name, last_name
FROM employee
inner join employee on roles_id = employee.role_id;