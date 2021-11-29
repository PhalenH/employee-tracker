SELECT * 
FROM department;

SELECT role.id, role.title, department.name AS department, role.salary 
FROM role 
JOIN department 
ON department.id = role.department_id
ORDER BY role.id;

SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT(emp.first_name, ' ', emp.last_name) AS manager
FROM employee
INNER JOIN role
ON role.id = employee.role_id
INNER JOIN department
ON department.id = role.department_id
LEFT JOIN employee emp
ON employee.manager_id = emp.id
ORDER BY employee.id;