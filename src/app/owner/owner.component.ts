import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Employee } from 'src/model/employee';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private employeeServ: EmployeeService) { }
  employee?:Employee

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    let id = this.route.snapshot.params['id']
    this.employee = await this.employeeServ.getEmployee(id);
  }

  logout() {
    this.router.navigateByUrl("")
  }

}
