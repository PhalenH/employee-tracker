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
VALUES ("Mia", "Wallace", 5, 5),
       ("Vincent", "Vega", 1, 5),
       ("Jules", "Winnfield", 3, 4),
       ("Marsellus", "Wallace", 2),
       ("Winston", "Wolf", 4, 4);