import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from 'highcharts-angular';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatGridListModule} from '@angular/material/grid-list';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DonorsPerStateComponent } from './pages/dashboard/components/donors-per-state/donors-per-state.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './interceptors/ApiInterceptor';
import { AgeRangeImcComponent } from './pages/dashboard/components/age-range-imc/age-range-imc.component';
import { ObesePercentagesComponent } from './pages/dashboard/components/obese-percentages/obese-percentages.component';
import { AverageAgePerBloodTypeComponent } from './pages/dashboard/components/average-age-per-blood-type/average-age-per-blood-type.component';
import { DonorsForEachBloodTypeComponent } from './pages/dashboard/components/donors-for-each-blood-type/donors-for-each-blood-type.component';
import {  } from '@angular/compiler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterGuardGuard } from './interceptors/router-guard.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DonorsPerStateComponent,
    AgeRangeImcComponent,
    ObesePercentagesComponent,
    AverageAgePerBloodTypeComponent,
    DonorsForEachBloodTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: APIInterceptor,
    multi: true,
  },RouterGuardGuard],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
