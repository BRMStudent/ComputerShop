import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Employee } from 'src/model/employee';
import { LoginDto } from 'src/model/loginDto';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private employeeServ: EmployeeService) { }
  loginDto: LoginDto = {
    username: '',
    password: ''
  }


  async login() {
    let responese = await this.employeeServ.login(this.loginDto);
    console.log(responese);
    switch (responese.department) {
      case 'owner': this.router.navigateByUrl('/owner/' + responese.id);
        break
      case 'pos': this.router.navigateByUrl('/pos/' + responese.id)
        break
      case 'store': this.router.navigateByUrl('/store/' + responese.id)
        break
      default: console.error("login failed");
        break
    }

  }

}
