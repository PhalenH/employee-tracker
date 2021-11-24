// const express = require("express");
// const fs = require("fs");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "rootpassword",
    database: "business_db",
  },
  console.log(`Connected to the business_db database.`)
);


// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function initial() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do",
        name: "initial",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit"
        ],
      },
    ])
    .then((initialChoice) => {
        if (initialChoice.initial === "View all departments"){
            displayDepartments();
        } else if (initialChoice.initial === "View all roles") {
            displayRoles();
        } else if (initialChoice.initial === "View all employees") {
            displayEmployees();
        } else if (initialChoice.initial === "Add a department") {
            addDepartment();
        } else if (initialChoice.initial === "Add a role") {
            addRole();
        } else if (initialChoice.initial === "Add an employee") {
            addEmployee();
        } else if (initialChoice.initial === "Update an employee role") {
            updateRole();
        } else if (initialChoice.initial === "Quit") {
            console.log("Have a good day!")
        }
    });
}

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
function displayDepartments() {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) {
      console.log(err);
    }
    console.table(results);
    initial();
  });
}

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function displayRoles() {
  connection.query(
    "SELECT role.id, role.title, department.name AS department, role.salary from role JOIN department ON role.department_id = department.id",
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      initial();
    }
  );
}

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function displayEmployees() {
  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary AS salary ---Finish this",
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      initial();
    }
  );
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the name of the department.",
        name: "department",
      },
    ])
    .then((departmentName) => {
      // add to department database
    });
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is the salary of the role?",
        name: "roleSalary",
      },
      {
        type: "list",
        message: "Which department does the role belong to?",
        name: "roleDepartment",
        choices: [], // figure out way to use the department db so this list in always up to date if user adds a department
      },
    ])
    .then((roleData) => {
      // add to role database
    });
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee’s first name?",
        name: "firstName",
      },
      {
        type: "input",
        message: "What is the employee’s last name?",
        name: "lastName",
      },
      {
        type: "input",
        message: "What is the employee’s role?",
        name: "employeeRole",
      },
      {
        type: "input",
        message: "Who is the employee’s manager?",
        name: "employeeManager",
      },
    ])
    .then((employeeData) => {
      // add to employee database
    });
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
function updateRole() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee's role do you want to update?",
        name: "selectedEmployee",
        choices: [], // array of employee names from db
      },
      {
        type: "list",
        message: "Which role do you want to assign to the selected employee?",
        name: "newRole",
        choices: [], // array of roles  from db
      },
    ])
    .then((updatedData) => {
      // update database for role and employee
    });
}

initial();
