import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit{

  id!: number;
  employee: Employee = new Employee();

  constructor(private employeeService: EmployeeService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    this.employeeService.getEmployeeById(this.id).subscribe(
      data => {
        this.employee = data;
      },
      error => console.log(error));  
  }

  addNewEmployeeToDB(){
    this.employeeService.addNewEmployee(this.employee).subscribe(
      data=>{
        console.log(data);
        this.goToEmployeeList();
      },
      error => console.log(error));
  }


  updateEmployee(){

    this.employeeService.updateEmployee(this.id, this.employee).subscribe(
      data=>{
        console.log(data);
        this.openSnackBar('Update Successful');
        this.goToEmployeeList();
      },
      error => console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/employees'])
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000, //
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
