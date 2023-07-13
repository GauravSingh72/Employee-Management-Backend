const Employee = require("../Models/Employee");

const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;

    // Create a new employee
    const employee = new Employee({
      firstName,
      lastName,
      email,
      department,
      salary,
    });

    // Save the employee to the database
    await employee.save();

    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Implement other CRUD operations and additional functionalities as per your requirements

module.exports = { createEmployee };
