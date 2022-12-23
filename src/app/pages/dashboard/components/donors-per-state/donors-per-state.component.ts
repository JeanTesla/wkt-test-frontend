import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts/highmaps'
import worldMap from "@highcharts/map-collection/countries/br/br-all.geo.json";
import { DonorsPerStateService } from './donors-per-state.service';

@Component({
  selector: 'app-donors-per-state',
  templateUrl: './donors-per-state.component.html',
  styleUrls: ['./donors-per-state.component.css']
})
export class DonorsPerStateComponent implements AfterViewInit{

  Highcharts = Highcharts;
  chartConstructor = "mapChart";
  updateChart: boolean = false;

  chartOptions: Highcharts.Options = {
    chart: {
      map: worldMap,
      borderRadius:10,
      height: '80%'
    },
    title: {
      text: "Doadores por estado"
    },
    subtitle: {text:"Deslize o mouse pelos estados para visualizar a quantidade"},
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        alignTo: "spacingBox"
      }
    },
    legend: {
      enabled: true
    },
    colorAxis: {
      min: 0
    },
    series: [
      {
        type: "map",
        name: "Doadores nesse estado",
        states: {
          hover: {
            color: "#BADA55"
          }
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}"
        },
        allAreas: true,
        data: [['br-pe', 90]]
      }
    ]
  };

  constructor(
    private donorsPerStateService: DonorsPerStateService
  ){}
 
  ngAfterViewInit(): void {
    this.donorsPerStateService.getDonorsPerState()
    .subscribe(data => {
      if(this.chartOptions.series !== undefined && data.length > 0){
        let chartData: any[] = [];
        data.forEach(el => {
          chartData.push(['br-' + el.state.toLowerCase(), el.count])
        })
        this.chartOptions.series[0] = {type: "map", data: chartData}; 
        this.updateChart = true;
      }
    })  
  }
}
