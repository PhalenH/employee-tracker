INSERT INTO department (name)
VALUES ("Production"),
       ("Human resources"),
       ("Finance"),
       ("Marketing"),
       ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Rep", 52000, 4),
       ("CEO", 500000, 5),
       ("Accountant", 75000, 3),
       ("Engineer", 100000, 1),
       ("Marketing Lead", 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mia", "Wallace", 1, 1),
       ("Vincent", "Vega", 2, 2),
       ("Jules", "Winnfield", 3, 3),
       ("Marsellus", "Wallace", 4, 4),
       ("Winston", "Wolf", 5, 5);