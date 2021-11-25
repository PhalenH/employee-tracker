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

let showDepartments;
let showRoles;
let showManagers;
let showEmployees;

// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function initial() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do",
        name: "choice",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit",
        ],
      },
    ])
    .then((initial) => {
      if (initial.choice === "View all departments") {
        displayDepartments();
      } else if (initial.choice === "View all roles") {
        displayRoles();
      } else if (initial.choice === "View all employees") {
        displayEmployees();
      } else if (initial.choice === "Add a department") {
        addDepartment();
      } else if (initial.choice === "Add a role") {
        addRole();
      } else if (initial.choice === "Add an employee") {
        addEmployee();
      } else if (initial.choice === "Update an employee role") {
        updateRole();
      } else if (initial.choice === "Quit") {
        console.log("Have a good day!");
        process.exit();
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
    "SELECT role.id, role.title, department.name AS department, role.salary from role JOIN department ON role.department_id = department.id ORDER BY role.id",
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
    "SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT(emp.first_name, ' ', emp.last_name) AS manager FROM employee INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee emp ON employee.manager_id = emp.id ORDER BY employee.id;",
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
        message: "Enter the name of the department?",
        name: "newDepartment",
      },
    ])
    .then((data) => {
      const newDepartment = data.newDepartment;
      connection.query("INSERT INTO department SET name = ?", newDepartment, (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log(`Added ${newDepartment} to the database`);
          initial();
        }
      );
    });
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
    connection.query("SELECT * FROM department", function (err, results) {
        showDepartments = results.map(department => ({ name: department.name, value: {id: department.id, name: department.name} }))
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the title of the role?",
        name: "roleTitle",
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
        choices: showDepartments
      },
    ])
    .then((roleData) => {
      const roleTitle = roleData.roleTitle;
      const roleSalary = roleData.roleSalary;
      const roleDepartment = roleData.roleDepartment.id;
      connection.query("INSERT INTO role SET ?", { title: roleTitle, Salary: roleSalary, department_id: roleDepartment}, (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log(`Added ${roleTitle} to the database`);
          initial();
        }
        );
      });
    });
  }

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
    connection.query("SELECT title, id from role", function (err, results) {
        showRoles = results.map(role => ({ name: role.title, value: {id: role.id, name: role.title} }))
    connection.query("SELECT first_name, last_name, id FROM employee;", function (err, results) {
        showManagers = results.map(manager => ({ name: manager.first_name + " " + manager.last_name, value: {id: manager.id, name: manager.first_name + " " + manager.last_name} }))
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
        type: "list",
        message: "What is the employee’s role?",
        name: "employeeRole",
        choices: showRoles
      },
      {
        type: "list",
        message: "Who is the employee’s manager?",
        name: "employeeManager",
        choices: showManagers
      },
    ])
    .then((employeeData) => {
      const firstName = employeeData.firstName;
      const lastName = employeeData.lastName;
      const employeeRole = employeeData.employeeRole.id;
      const employeeManager = employeeData.employeeManager.id;
      connection.query("INSERT INTO employee SET ?", { first_name: firstName, last_name: lastName, role_id: employeeRole, manager_id: employeeManager}, (err, results) => {
          if (err) {
            console.log(err);
          }
          console.log(`Added ${firstName} ${lastName} to the database`);
          initial();
        }
      );
    });
   });
 });
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
function updateRole() {
    connection.query("SELECT id, first_name, last_name FROM employee;", function (err, results) {
        showEmployees = results.map(employee => ({ name: employee.first_name + " " + employee.last_name, value: {id: employee.id, first: employee.first_name, last: employee.last_name} }))
    connection.query("SELECT title, id from role", function (err, results) {
        showRoles = results.map(role => ({ name: role.title, value: {id: role.id, name: role.title} }))
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which employee's role do you want to update?",
        name: "selectedEmployee",
        choices: showEmployees
      },
      {
        type: "list",
        message: "Which role do you want to assign to the selected employee?",
        name: "newRole",
        choices: showRoles
      },
    ])
    .then((updatedData) => {
        const employeeID = updatedData.selectedEmployee.id;
        const newRole = updatedData.newRole.id
        connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [newRole, employeeID], (err, results) => {
            if (err) {
              console.log(err);
            }
            console.log(`Updated employee's role`);
            initial();
          }
        );
    });
   });
  });
}

initial();