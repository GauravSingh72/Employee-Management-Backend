const express = require("express");
const router = express.Router();
const Employee = require("../Models/Employee");

router.post("/", async (req, res) => {
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
});

// Read all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Read a specific employee
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update an employee
router.put("/:id", async (req, res) => {
  try {
    const { firstName, lastName, email, department, salary } = req.body;

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        firstName,
        lastName,
        email,
        department,
        salary,
      },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete an employee
router.delete("/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
