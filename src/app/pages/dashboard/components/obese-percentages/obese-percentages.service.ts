import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ObesePercentages } from './obese-percentages';

@Injectable({
  providedIn: 'root'
})
export class ObesePercentagesService {

  constructor(private http: HttpClient) { }

  getObesePercentages() : Observable<ObesePercentages>{
    return this.http.get<ObesePercentages>("/candidates/obesepercentages");
  }
}
