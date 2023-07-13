const Employee = require("../Models/Employee");

const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;

    const employee = new Employee({
      firstName,
      lastName,
      email,
      department,
      salary,
    });

    await employee.save();

    res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { createEmployee };
