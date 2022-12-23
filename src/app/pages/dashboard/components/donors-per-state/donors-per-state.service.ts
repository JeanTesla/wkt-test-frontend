import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DonorPerState } from './donor-per-state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonorsPerStateService {

  constructor(private http: HttpClient) { }

  getDonorsPerState() : Observable<Array<DonorPerState>>{
    return this.http.get<Array<DonorPerState>>("/candidates/perstates");
  }
}
