# Employee Tracker

## Table of Contents
- [Description](#Description)
- [Video](#Video)
- [Installation](#Installation)
- [Usage](#Usage)
- [Questions](#Questions)

## Description: 
The purpose of this application was to create an interface that allows non-developers to easily view and interact with information stored in databases or "Content management systems" or CMS. This application allows a non-developer to view their companies departments, roles, and employees as well as create new departments, roles, and employess, and as for now can also update an employee's role using the command line. The acceptance criteria is as follows:

- WHEN I start the application
    - THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments
    - THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles
    - THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees
    - THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department
    - THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role
    - THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee
    - THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
- WHEN I choose to update an employee role
    - THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

## Video:
[Employee Tracker Walkthrough Vdieo](https://youtu.be/NNiVm11lm1Y)

## Installation: 
- Download or clone the repo from GitHub

## Usage: 
Once downloaded
- A user will open a new terminal
- Type in "npm i" to install dependencies
- Type in "mysql -u root -p"
    - Type in their mysql password
- Write the following lines in the mysql terminal
    - "source db/schema.sql" and hit enter
    - "source db/seeds.sql" and hit enter
    - "Quit" and hit enter
- In the same terminal or a new terminal 
    - Type in "node index.js"
- Select from the options presented and fill out prompts as needed

## Contributing: 
  There a no plans for public contribution at this time.

## Questions
- If you have any questions, email me at pchaze@yahoo.com
- Checkout my GitHub profile [here](https://github.com/PhalenH)


