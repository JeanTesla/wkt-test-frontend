import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DonorsForEachBloodType } from './donors-for-each-blood-type';

@Injectable({
  providedIn: 'root'
})
export class DonorsForEachBloodTypeService {

  constructor(private http: HttpClient) { }

  getDonorsForEachBloodType() : Observable<DonorsForEachBloodType>{
    return this.http.get<DonorsForEachBloodType>("/candidates/donorsperbloodtype");
  }
}
