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


const mysql = require('mysql2/promise');
let inquirer = require("inquirer")

let connection

initialize()
main();


async function initialize() {
    connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'Gucci_db', password: "rootroot" })

}


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
            updateRoll()
            // console.log("hello7")
        }
        if (responseObject.starterQuestion === "nada"){
            endingMessage()
            // console.log("hello8")
        }
       






        async function viewAllDepartments(){
            const [rows] = await connection.execute(`SELECT * FROM department;`)
            console.log("table with all the departments")
            console.table(rows)
        }

        async function viewAllRoles(){
            const [rows] = await connection.execute(`SELECT * FROM role;`)
            console.table(rows)
        }
        async function viewAllEmployees(){
            const [rows] = await connection.execute(`SELECT * FROM employees;`)
            console.log("table with all the employees")
            console.table(rows)
        }



        async function addDepartment(){
            let userInput = await inquirer.prompt([{
                type: 'input',
                name: 'addDepartment',
                message: "What department would you like to add",
            }])
            // let deptSQL = insert into department (name) values("marketing");SELECT * FROM department;
            let deptSQL = await connection.execute(`insert into department (name) values(?);`, [userInput.addDepartment])
            viewAllDepartments()
            console.log(deptSQL)
        }



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
            console.log(userInput.roleJob + userInput.roleSalary + userInput.departmentID)
            //insert INTO roles ______
            //value ____
        }


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
                message: "what is the employees role ID",
            },
            {
                type: 'input',
                name: 'managerID',
                message: "what is the managers ID",
            }

        
        
        
        
        

        ])
            console.log(userInput.addEmployeeName)
        }


        async function updateRoll(){
            const [rows] = await connection.execute(`SELECT * FROM employees;`)
            console.table(rows)
        }


        async function endingMessage(){
            console.table("Thank you have a great day")
        }

    }
    
    