import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
url="http://localhost:3000/employees";

  constructor( private _http:HttpClient) { }

  createEmployee( date :any): Observable<any> {
    return this._http.post('http://localhost:3000/employees',date);
  }

  readeEmployeelist(): Observable<any> {
    return this._http.get('http://localhost:3000/employees');
  }

  updateEmployee(id:number, date :any): Observable<any> {
    return this._http.put(this.url+"/"+id ,date);
  }

  deleteEmplyee(id:number):Observable<any>{
    return this._http.delete(this.url+"/"+id);
  }

}
