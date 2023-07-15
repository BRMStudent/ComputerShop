import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";
import { Employee } from 'src/model/employee';
import { LoginDto } from 'src/model/loginDto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }
  private endPoints = "http://202.28.34.197:9202/api/Employees"

  async login(loginDto: LoginDto) {
    return await firstValueFrom(this.http.post<Employee>(this.endPoints + "/login", loginDto));
  }

  async getEmployees() {
    return await firstValueFrom(this.http.get<Employee[]>(this.endPoints))
  }

  async getEmployee(id: number) {
    return await firstValueFrom(this.http.get<Employee>(this.endPoints + "/" + id))
  }

  async addEmployee(employee: Employee) {
    return await firstValueFrom(this.http.post<Employee>(this.endPoints, employee))
  }

  async updateEmployee(id: number, employee: Employee) {
    return await firstValueFrom(this.http.put<Employee>(this.endPoints + "/" + id, employee))
  }

  async deleteEmployee(id: number) {
    return await firstValueFrom(this.http.delete(this.endPoints + "/" + id))
  }

}
