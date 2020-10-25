const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Bulls1996",
    database: "employeeTrackerDB"
});

connection.connect(err => {
    if (err) throw err;
    console.log("connected as id" + connection.threadId + "\n");
    mainMenu();
});

function query(sql, args) {
    return new Promise((res, rej) => {
        connection.query(sql, args, (err, rows) => {
            if (err)
                return rej(err);
            res(rows)
        })
    })
}


function mainMenu() {
    return inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do???",
            name: "mainMenu",
            choices: [
                "View all Employees",
                "View all Departments",
                "View all Roles",
                "Add Department",
                "Add Role",
                "Add Employee",
                "update Employee",
                "View all Employees by Department",
                "View all Employees by Manager",
                "Update Employee Role",
                "Update Employee Manager",
                "Quit"
            ]
        }
    ]).then(res => {

        switch (res.mainMenu) {
            case "View all Employees":
                viewEmployees();
                break;
            
            case "View all Departments":
                viewDepartment();
                break;

            case "View all Roles":
                viewRoles();
                break;

            case "Add Department":
                addDepartment();
                break;

            case "Add Role":
                AddRole();
                break;

            case "Add Employee":
                AddEmployee();
                break;

            case "update Employee":
                updateEmployee();
                break;

            case "Quit":
            default:
                connection.end();
        }
    });
}


function viewEmployees() {
    connection.query(" SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles on employees.role_id = role_id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id;", (err, result) =>{
        if (err) throw err;

        console.table(result);

        mainMenu();
    });
;}


function viewDepartment(){
    connection.query("SELECT * FROM departments", (err, result) => {
        if (err) throw err;

        console.table(result);

        mainMenu();
    });
};

function viewRoles() {
    connection.query("SELECT * FROM roles;", (err, result) => {
        if (err) throw err;

        console.table(result);

        mainMenu();
    });
};

async function addDepartment() {

    const answer = await inquirer.prompt([
        {
            type: "input",
            message: "What department name would you like to add",
            name: "department"
        }
    ]);
    connection.query("INSERT INTO departments", { name: answer.department }, (err, result) => {
        if (err)
            throw err;
        console.log("department is added!");

        mainMenu();
    });
};


function AddRole() {

    return inquirer.prompt([
        {
            type: "input",
            message: "Which title would you like to add",
            name: "title"
        },
        {
            type: "input",
            message: "Enter your salary",
            name: "salary"
        },
        {
            type: "input",
            message: "Please enter your department ID",
            name: "department_id"
        }

    ]).then(answer => {
        connection.query("INSERT INTO roles SET", {title: answer.title, salary: answer.salary, department_id: answer.department_id}, (err, result) =>{
            if (err) throw err;

            console.log("role is added");

            mainMenu();
        })
    });
};

function AddEmployee() {

    return inquirer.prompt([
        {
            type: "input",
            message: "please enter employee first name",
            name: "firstName"
        },
        {
            type: "input",
            message: "Please enter employee last name",
            name: "lastName"
        },
        {
            type: "input",
            message: "Enter employee role ID",
            name: "employeeId"
        },
        {
            type: "input",
            message: "Please enter manager ID",
            name: "managerId"
        }
    ]).then(answer => {
        connection.query("INSERT INTO employees SET", {first_name: answer.firstName, last_name: answer.lastName, role_id: answer.employeeId, manager_id: answer.managerId}, (err, result) => {
            if (err) throw err;

            console.log("Your new employee is added!");

            mainMenu();
        });
    });
};

function updateEmployee() {
    return inquirer.prompt([
        {
            type: "input",
            messsage: "Which eployee would you like to update",
            name: "updatingEmployee"
        },
        {
            type: "input",
            message: "Which role do you want to assign the selected employee",
            name: "updatingRole"
        },

    ]).then(results => {
        connection.query("UPDATE employees SET role_id = ? WHERE roles.id = ?", {firstName: answer.updateEmployee, last_name: answer.lastName}, (err, result) =>{
            if (err) throw err;

            consolw.log("Employee is updated");

            mainMenu();
        });
    });
};