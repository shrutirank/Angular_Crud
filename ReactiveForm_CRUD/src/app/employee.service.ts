import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './form/form.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  
  private baseURL="http://localhost:8080/api/v1/emp";

  private url="http://localhost:8080/api/v1/subject";

  constructor(private httpClient :HttpClient) { }

  getEmployeeList(): Observable<Student[]>{
    return this.httpClient.get<Student[]>(`${this.baseURL}`);
  }
  
  // getEmployeeListPage(request): Observable<Student[]>{
     
  //   return this.httpClient.get<Student[]>(`${this.baseURL}/page?page=${request.page}&size=${request.size}`);
  // }


createEmployee(employee:Student):Observable<Object>{
 return this.httpClient.post(`${(this.baseURL)}`,employee);
}
getEmployeeBYId(id:number) :Observable<Student>{
   return this.httpClient.get<Student>(`${this.baseURL}/${id}`)
}
updateEmployee(id:number,employee:Student):Observable<object>{
 return this.httpClient.put(`${this.baseURL}/${id}`,employee);
}
deleteEmployee( id:number):Observable<object>{
 return this.httpClient.delete(`${this.baseURL}/${id}`);
}


//subject

deleteSubject(id:number):Observable<object>{
return this.httpClient.delete(`${this.url}/${id}`);
}
}
