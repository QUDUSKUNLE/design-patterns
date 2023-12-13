// Single Responsiblity Principle
// A class should have only one responsibility
// A class or module should have only one reason to change

// Before SRP
class Employee {
  calculateSalary() {
    // Calculate Salary
  }

  calculateTax() {
    // Calculate Tax
  }

  generateReport() {
    // Generate Report
  }
}

// After SRP
class EmployeeSalary {
  calculateEmployeeSalary() {}
}

class EmployeeTax {
  calculateEmployeeTax() {}
}

class EmployeeReport {
  calculateEmployeeReport() {}
}
