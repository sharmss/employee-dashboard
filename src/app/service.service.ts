import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  api="http://localhost:3000/data";
  constructor(private http:HttpClient) { }

  getUser(data:any){
    return this.http.post(this.api,data)
  }

  loadUser(){
    return this.http.get(this.api)
  }

  updateUser(data:any,id:any){
    return this.http.put(
      `${this.api}/${id}`,data
    )
  }

  deleteUser(id:any){
    return this.http.delete(
      `${this.api}/${id}`
    )
  }

}
