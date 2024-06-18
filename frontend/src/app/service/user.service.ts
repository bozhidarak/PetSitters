import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/new-user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any>{
    return this.http.get(`api/users/${id}`);
  }

  login(email: string, password: string): Observable<any>{
    return this.http.post(`api/users/login`, {email, password});
  }

  register(user: User, profilePic: File): Observable<User> {
    console.log(user);
    const formData = new FormData();

    formData.append('userDTO', new Blob([JSON.stringify(user)], {type: 'application/json'}));
    formData.append('profilePic', profilePic, profilePic.name);
    
    formData.forEach((value, key) => {console.log(key + ' ' + value)});

    return this.http.post<User>(`api/users/register`, formData);
  }

}
