import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { EmployeeService } from '../service/employee.service';
import { Employee } from 'src/model/employee';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private employeeServ: EmployeeService) { }
  employee?: Employee

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
