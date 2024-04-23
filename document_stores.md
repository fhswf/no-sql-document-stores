# Document Stores

**ToDo: Einleitungstext einfügen**

## Daten einfügen

Zuerst werden die Collections `employees` und `departments` mit Beispieldaten befüllt (und dadurch gleichzeitig initalisiert). Auf diesen Collections basieren die Abfragen im weiteren Verlauf. 

```MQL
Collection employees

`db.employees.insertMany([
  {
    employee_id: 1,
    name: "John Doe",
    department_id: 101,
    position: "Software Engineer",
    salary: 80000
  },
  {
    employee_id: 2,
    name: "Jane Smith",
    department_id: 102,
    position: "Marketing Manager",
    salary: 90000
  },
  {
    employee_id: 3,
    name: "Michael Johnson",
    department_id: 101,
    position: "Database Administrator",
    salary: 85000
  },
  {
    employee_id: 4,
    name: "Emily Davis",
    department_id: 103,
    position: "HR Specialist",
    salary: 75000
  },
  {
    employee_id: 5,
    name: "David Brown",
    department_id: 102,
    position: "Sales Manager",
    salary: 95000
  }
])`
```

```
Collection departments

`db.departments.insertMany([
  {
    department_id: 101,
    name: "Engineering",
    location: "New York"
  },
  {
    department_id: 102,
    name: "Marketing",
    location: "Los Angeles"
  },
  {
    department_id: 103,
    name: "Human Resources",
    location: "Chicago"
  },
  {
    department_id: 104,
    name: "Finance",
    location: "Houston"
  }
])`
```

## Daten hinzufügen

## Daten aktualisieren

## Daten löschen

