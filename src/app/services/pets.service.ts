import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Pet } from '../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  createPet(pet: Pet) {
    const headers = this.auth.contentHeader();
    var url:string = `${this.auth.apiUrl}/pet`;

    return this.http.post<Pet>(url, pet, {headers: headers});
  }

  getPetList(status: 'available' | 'pending' | 'sold' = 'available') {
    const headers = this.auth.contentHeader();
    var url:string = `${this.auth.apiUrl}/pet/findByStatus?status=${status}`;

    return this.http.get<Pet[]>(url, {headers: headers});
  }
}
