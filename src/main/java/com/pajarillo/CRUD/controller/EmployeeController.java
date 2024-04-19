package com.pajarillo.CRUD.controller;

import com.pajarillo.CRUD.exception.ResourceNotFoundException;
import com.pajarillo.CRUD.model.Employee;
import com.pajarillo.CRUD.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular app
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    //Get all Employees

    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    //Insert new employee
    @PostMapping("/employees")
    public Employee insertEmployee(@RequestBody Employee employee){
        return employeeRepository.save(employee);
    }

    //Find Specific Employee
    @GetMapping("/employees/{empId}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long empId){
        //Retrieve Employee by ID
       Employee emp = employeeRepository.findById(empId)
               .orElseThrow(() -> new ResourceNotFoundException("Employee not found."));

       return ResponseEntity.ok(emp);
    }

    @PutMapping("/employees/{empId}")
    public ResponseEntity<Employee> updateEmployee(@RequestBody Employee existingEmp,
                                                   @PathVariable Long empId){

        //Retrieve Employee by ID
        Employee employee = employeeRepository.findById(empId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found."));

        employee.setFirstName(existingEmp.getFirstName());
        employee.setLastName(existingEmp.getLastName());
        employee.setEmail(existingEmp.getEmail());
        employee.setPassword(existingEmp.getPassword());

        Employee updatedEmployee = employeeRepository.save(employee);

        return ResponseEntity.ok(updatedEmployee);

    }

    //Delete Employee using Employee ID
    @DeleteMapping("employees/{empId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long empId){

        Optional<Employee> employee = employeeRepository.findById(empId);

        if (employee.isPresent()){
            employeeRepository.deleteById(empId);
            return ResponseEntity.ok("{\"message\": \"Employee Deleted Successfully\"}");
        }
        else{
            return ResponseEntity.notFound().build();
        }

    }
}
