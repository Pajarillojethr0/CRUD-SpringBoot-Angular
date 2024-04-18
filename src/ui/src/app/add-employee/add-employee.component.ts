import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit{

  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService,
              private router: Router){}
  
  ngOnInit(): void {}

  addNewEmployeeToDB(){
    this.employeeService.addNewEmployee(this.employee).subscribe(
      data=>{
        console.log(data);
        this.goToEmployeeList();
      },
      error => console.log(error));
  }

  goToEmployeeList(){
      this.router.navigate(['/employees'])
  }

  saveEmployee(){
    console.log(this.employee);
    this.addNewEmployeeToDB();
  }
}
