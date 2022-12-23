import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AgeRangeImc } from './age-range-imc';

@Injectable({
  providedIn: 'root'
})
export class AgeRangeImcService {

  constructor(private http: HttpClient) { }

  getAgeRangeImcs() : Observable<Array<AgeRangeImc>>{
    return this.http.get<Array<AgeRangeImc>>("/candidates/agerangeimcs");
  }
}
