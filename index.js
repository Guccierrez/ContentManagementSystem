// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

//dependencies
const mysql = require('mysql2/promise');
let inquirer = require("inquirer")

let connection

initialize()
main();

//connects VS code to MySql
async function initialize() {
    connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'Gucci_db', password: "rootroot" })

}

//this prompt initiates all 8 options there are to choose from
async function main() {
    // get the client
    // create the connection
        const responseObject = await inquirer.prompt([{
            //Remember to add a welcome message
            type: 'list',
            name: 'starterQuestion',
            message: "Hello, what would you like to do?",
            choices: ["view all departments",
                      "view all roles",
                      "view all employees",
                      "add a department",
                      "add a role",
                      "add an employee",
                      "update an employee role",
                      "nada"]
        }])

        // console.log(responseObject)

        //these 8 if statesments direct the user to the code that actually does what they want
        // for example the first initializes line 96 and displays the department table
        if (responseObject.starterQuestion === "view all departments"){
            viewAllDepartments()
            console.log("hello1")
        }
        if (responseObject.starterQuestion === "view all roles"){
            viewAllRoles()
            console.log("hello2")
        }
        if (responseObject.starterQuestion === "view all employees"){
            viewAllEmployees()
            console.log("hello3")
        }
        if (responseObject.starterQuestion === "add a department"){
            addDepartment()
            // console.log("hello4")
        }
        if (responseObject.starterQuestion === "add a role"){
            addRole()
            // console.log("hello5")
        }
        if (responseObject.starterQuestion === "add an employee"){
            addEmployee()
            // console.log("hello6")
        }
        if (responseObject.starterQuestion === "update an employee role"){
            updateRole()
            // console.log("hello7")
        }
        if (responseObject.starterQuestion === "nada"){
            endingMessage()
            // console.log("hello8")
        }
       
    }





        async function viewAllDepartments(){
            const [rows] = await connection.execute(`SELECT * FROM department;`)
            console.log("table with all the departments")
            console.table(rows)
            main()
        }

        async function viewAllRoles(){
            const [rows] = await connection.execute(`SELECT role.id, 
            role.title, 
            role.salary, 
            department.name 
            AS department
            FROM role
            INNER JOIN department ON role.department_id = department.id;`)
            console.table(rows)
            main()
        }

        async function viewAllEmployees(){
            // const [rows] = await connection.execute(`SELECT * FROM employees;`)
            const [rows] = await connection.execute(`SELECT employees.id, 
            employees.first_name, 
            employees.last_name, 
            role.title, 
            department.name AS department,
            role.salary, 
            CONCAT (manager.first_name, " ", manager.last_name) AS manager
            FROM employees
            LEFT JOIN role ON employees.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employees manager ON employees.manager_id = manager.id;`)
            console.log("table with all the employees")
            console.table(rows)
            main()
        }

        async function addDepartment(){
            let userInput = await inquirer.prompt([{
                type: 'input',
                name: 'addDepartment',
                message: "What department would you like to add",
            }])
            // let deptSQL = insert into department (name) values("marketing");SELECT * FROM department;
            let deptSQL = await connection.execute(`insert into department (name) values(?);`, [userInput.addDepartment])
            let [viewDept] = await connection.execute(`select * from department`)
            console.log(deptSQL)
            console.table(viewDept)
            main()
        }

            //This prompt allows users to input information for the new role
        async function addRole(){
            let userInput = await inquirer.prompt([{
                type: 'input',
                name: 'roleJob',
                message: "What role would you like to add",
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: "What will be their salary",

            },
            {
                type: 'input',
                name: 'departmentID',
                message: "what is the employees department ID",
            },
        ])
         let roleSQL = await connection.execute(`insert into role (title, salary, department_id) values(?, ?, ?);`, [userInput.roleJob, userInput.roleSalary, userInput.departmentID])
         let [viewAllRoles] = await connection.execute(`select * from role`)
            console.log(roleSQL)
            console.table(viewAllRoles)
            main()
        }

        //this block of code does the same as the previous one but for employees
        async function addEmployee(){
            let userInput = await inquirer.prompt([{
                type: 'input',
                name: 'employeeFirstName',
                message: "First name of new employee",
            }, 
            {
                type: 'input',
                name: 'employeeLastName',
                message: "Last name of new employee",
            },
            {
                type: 'input',
                name: 'employeeRoleId',
                message: "what is the employees role ID?",
            },
            {
                type: 'input',
                name: 'managerID',
                message: "what is the managers ID",
            },

        ])
        let employeeSQL = await connection.execute(`insert into employees (first_name, last_name, role_id, manager_id) values(?, ?, ?, ?);`, [userInput.employeeFirstName, userInput.employeeLastName, userInput.employeeRoleId, userInput.managerID])
        let [viewAllEmployees] = await connection.execute(`select * from employees`)
        console.log(employeeSQL)
        console.table(viewAllEmployees)
       main()
        }
        // this block of code allows user to change information that's already in the database
        async function updateRole(){
            const [employees] = await connection.execute(`SELECT first_name as name, id as value FROM employees;`)
            const [role] = await connection.execute(`SELECT id as value, title as name FROM role;`)
            // console.log( role, employees )
            
                let userInput = await inquirer.prompt([{
                    type: 'list',
                    name: 'updateEmployee',
                    message: "What employee would you like to update",
                    choices: employees
                },
                {
                    type: 'list',
                    name: 'updateRole',
                    message: "What would you like their new role to be",
                    choices: role
                }
            ])
            const [updatedRole] = await connection.execute(`UPDATE employees SET role_id = ? WHERE id = ?;`,[userInput.updateRole, userInput.updateEmployee])
            let [viewAllEmployees] = await connection.execute(`SELECT employees.id, 
            employees.first_name, 
            employees.last_name, 
            role.title, 
            department.name AS department,
            role.salary, 
            CONCAT (manager.first_name, " ", manager.last_name) AS manager
            FROM employees
            LEFT JOIN role ON employees.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employees manager ON employees.manager_id = manager.id;`)
            console.log(updatedRole)
            console.table(viewAllEmployees)
            main()
        }

        //this funcion ends the application
        async function endingMessage(){
            console.log("Thank you have a great day")
        }

    
    
    