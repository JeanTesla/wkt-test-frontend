import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AverageAgePerBloodType } from './average-age-per-blood-type';

@Injectable({
  providedIn: 'root'
})
export class AverageAgePerBloodTypeService {

  constructor(private http: HttpClient) { }

  getAverageAgePerBloodType() : Observable<Array<AverageAgePerBloodType>>{
    return this.http.get<Array<AverageAgePerBloodType>>("/candidates/averageageperbloodtypes");
  }
}
