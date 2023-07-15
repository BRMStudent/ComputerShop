import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { first, firstValueFrom, lastValueFrom } from 'rxjs';
import { Employee } from 'src/model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [ConfirmationService]
})

export class EmployeeComponent implements OnInit {
  constructor(private http: HttpClient, private employeeServ:EmployeeService) { }

  employees: Employee[] = []
  selectedEmployee: Employee = {
    id: 0,
    name: '',
    username: '',
    password: '',
    department: '',
    image: ''
  }
  newEmployee?: Employee
  deptOption: any = [
    { label: 'เจ้าของร้าน', value: 'owner' },
    { label: 'พนักงานขาย', value: 'pos' },
    { label: 'พนักงานคลังสินค้า', value: 'store'},
  ]
  isOpenAddDialog = false;

  ngOnInit(): void {
    this.getEmployees();
  }

  refresh() {
    this.getEmployees();
  }

  private async getEmployees() {
    let employees = await this.employeeServ.getEmployees()
    this.employees = employees
    console.log(employees);
  }

  async addEmployee() {
    let response = await this.employeeServ.addEmployee(this.newEmployee!)
    this.getEmployees();
    console.log(response);
    this.isOpenAddDialog = false;
  }

  async updateEmployee() {
    if (confirm("ต้องการอัพเดตข้อมูล " + this.selectedEmployee.name + "?")) {
      let response = await this.employeeServ.updateEmployee(this.selectedEmployee.id, this.selectedEmployee);
      console.log(response);
      this.getEmployees();
      this.selectedEmployee = {
        id: 0,
        name: '',
        username: '',
        password: '',
        department: '',
        image: ''
      }
    }
  }

  async deleteEmployee() {
    if (confirm("ต้องการลบ " + this.selectedEmployee.name + "?")) {
    
      await this.employeeServ.deleteEmployee(this.selectedEmployee.id)
      this.getEmployees();
      this.selectedEmployee = {
        id: 0,
        name: '',
        username: '',
        password: '',
        department: '',
        image: ''
      }
    }
  }

  showAddDialog() {
    this.newEmployee = {
      id: 0,
      name: '',
      username: '',
      password: '',
      department: '',
      image: ''
    }
    this.selectedEmployee = {
      id: 0,
      name: '',
      username: '',
      password: '',
      department: '',
      image: ''
    }
    this.isOpenAddDialog = true;
  }



}
