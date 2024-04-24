**Todo: Einleitungstext einfügen**

# Grundlegende CRUD Operationen

## Daten einfügen

Zuerst werden die Collections `employees` und `departments` mit Beispieldaten befüllt (und dadurch gleichzeitig initalisiert). Auf diesen Collections basieren die Abfragen im weiteren Verlauf. 


Collection **employees**
```
db.employees.insertMany([
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
])
```

Collection **departments**
```
db.departments.insertMany([
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
])
```

## Daten hinzufügen

**Einen** Mitarbeiter hinzufügen (*Neue Mitarbeiterin in der HR Abteilung*)
```
db.employees.insertOne({
  employee_id: 6,
  name: "Alice Johnson",
  department_id: 103,
  position: "HR Assistant",
  salary: 60000
})
```

**Mehrere** Mitarbeiter hinzufügen (*Verschiedene Abteilungen*)
```
db.employees.insertMany([
  {
    employee_id: 7,
    name: "Bob Williams",
    department_id: 102,
    position: "Marketing Coordinator",
    salary: 70000
  },
  {
    employee_id: 8,
    name: "Charlie Brown",
    department_id: 101,
    position: "Software Developer",
    salary: 80000
  }
])
```

## Daten aktualisieren

**Einzelne** Mitarbeierin aktualisieren (*Gehalt auf neuen Wert setzen*)
```
db.employees.updateOne(
  { name: "Alice Johnson" },
  { $set: { salary: 65000 } }
)
```

**Mehrere** Mitarbeiter aktualisieren (*Gehaltserhöhung für alle Mitarbeiter der Abteilung Engineering*)
```
db.employees.updateMany(
  { department_id: 101 },
  { $inc: { salary: 5000 } }
)
```

## Daten löschen

**Einzelnen** Mitarbeiter löschen (*ID 6*)
```
db.employees.deleteOne({ employee_id: 6 })
```

**Mehrere** Mitarbeiter löschen (*Gehalt < 70000*)
```
db.employees.deleteMany({ salary: { $lt: 70000 } })
```

# Daten auslesen

## Aufbau der Abfrage

**Todo: Quelle (Buch) einfügen**<br>

`db.<collection>.find ( kriterien, projektion )`

- In der **MongoDB Query Language** (kurz: MQL) kann in einer Abfrage **eine** Collection durchsucht werden
- Gesucht wird anhand eines **Dokuments**, dass die **Suchkriterien** beinhaltet
- Außerdem kann die **Ausgabe** konfiguriert werden, um z.B. einzelne Spalten aus- oder einzublenden

## Grundlegende Abfragen

Name, Position und Gehalt von allen Mitarbeitern:
`db.employees.find({}, {_id: 0, name: 1, position: 1, salary: 1})`

Alle Mitarbeiter in der Abteilung "Engineering" anzeigen:
`db.employees.find({ department_id: 101 })`

Mitarbeiter mit einem Gehalt über 80000 anzeigen:
`db.employees.find({ salary: { $gt: 80000 } })`

## Aggregationen

Durchschnittliches Gehalt pro Abteilung berechnen:
```
db.employees.aggregate([
  {
    $group: {
      _id: "$department_id",
      avgSalary: { $avg: "$salary" }
    }
  }
])
```

Anzahl der Mitarbeiter pro Abteilung anzeigen:
```
db.employees.aggregate([
  {
    $group: {
      _id: "$department_id",
      count: { $sum: 1 }
    }
  }
])
```

## Verbinden von Collections (*Joins*)

Mitarbeiter mit ihren Abteilungsinformationen anzeigen:
```
db.employees.aggregate([
  {
    $lookup: {
      from: "departments",
      localField: "department_id",
      foreignField: "department_id",
      as: "department"
    }
  },
  {
    $unwind: "$department"
  },
  {
    $project: {
      _id: 0,
      employee_id: 1,
      name: 1,
      position: 1,
      salary: 1,
      department_name: "$department.name",
      location: "$department.location"
    }
  }
])
```

Abteilungen mit der Anzahl ihrer Mitarbeiter anzeigen:
```
db.departments.aggregate([
  {
    $lookup: {
      from: "employees",
      localField: "department_id",
      foreignField: "department_id",
      as: "employees"
    }
  },
  {
    $project: {
      _id: 0,
      department_id: 1,
      name: 1,
      location: 1,
      employee_count: { $size: "$employees" }
    }
  }
])
```

# Indizes



# Aufgaben

