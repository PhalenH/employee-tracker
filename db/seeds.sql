INSERT INTO department (name)
VALUES ("Finance"),
       ("Marketing"),
       ("Sales"),
       ("Management");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 90000, 1),
       ("Accountant Lead", 110000, 1),
       ("Media coordinator", 75000, 2),
       ("Marketing Lead", 80000, 2),
       ("Sales Rep", 52000, 3),
       ("Sales Lead", 70000, 3),
       ("Manager", 120000, 4),
       ("CEO", 1000000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mia", "Wallace", 5, 3),
       ("Vincent", "Vega", 3, 6),
       ("Jules", "Winnfield", 6, 5),
       ("Marsellus", "Wallace", 8, null),
       ("Winston", "Wolf", 7, 4),
       ("Butch", "Coolidge", 4, 5),
       ("Buddy", "Holly", 2, 5),
       ("Honey", "Bunny", 1, 7);