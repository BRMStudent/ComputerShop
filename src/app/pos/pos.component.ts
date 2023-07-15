import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { Employee } from 'src/model/employee';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {

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
