// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee.js");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }

  getRole() {
    return "Manager";
  }
  getOfficeNumber() {
    return this.officeNumber;
  }
}

module.exports = Manager;

// const emp = new Employee("hey", 3, "eme@dge.com");
// console.log(emp);
// const man = new Manager("Man", 3, "man@dge.com");
// console.log(man);
// console.log(man.getRole());
// console.log(man.officeNumber);
