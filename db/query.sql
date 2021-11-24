SELECT * 
FROM department;

SELECT role.id, role.title, department.name AS department, role.salary 
FROM role 
JOIN department 
ON department.id = role.department_id;

SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary
FROM employee
JOIN role
ON role.id = employee.role_id
JOIN department
ON department.id = role.department_id
LEFT JOIN 
(SELECT emp.id AS emp_id, CONCAT(mgr.first_name, ' ', mgr.last_name) AS manager
FROM employee emp 
JOIN employee mgr
ON emp.manager_id = mgr.id) manager
ON employee.id = manager.emp_id;


-- SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary AS salary
-- FROM employee
-- JOIN role
-- ON role.id = employee.role_id
-- JOIN department
-- ON department.id = role.department_id
-- JOIN (SELECT emp.id AS emp_id, emp.manager_id, mgr.first_name, mgr.last_name 
-- FROM employee emp 
-- LEFT JOIN employee mgr
-- ON emp.manager_id = mgr.id) manager
-- ON employee.id = manager.emp_id;