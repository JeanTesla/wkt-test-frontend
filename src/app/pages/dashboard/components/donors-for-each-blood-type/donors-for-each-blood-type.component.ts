import { Component } from '@angular/core';
import { DonorsForEachBloodTypeService } from './donors-for-each-blood-type.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-donors-for-each-blood-type',
  templateUrl: './donors-for-each-blood-type.component.html',
  styleUrls: ['./donors-for-each-blood-type.component.css']
})
export class DonorsForEachBloodTypeComponent {

  updateChart: boolean = false;
  Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      plotShadow: false,
      type: 'pie',
      borderRadius:10,
      height: '80%'
    },
    title: {
      text: 'Quantidade de doadores disponíveis para cada tipo de sangue'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y}'
        }
      }
    },
    series: [{
      type:'pie',
      name: 'Doadores',
      colorByPoint: true,
      data: []
    }]
  };

  constructor(private donorsForEachBloodTypeService: DonorsForEachBloodTypeService) { }

  ngAfterViewInit(): void {
    this.donorsForEachBloodTypeService.getDonorsForEachBloodType()
      .subscribe(data => {
        if (this.chartOptions.series !== undefined && data) {
          let chartData: any[] = [];
          Object.entries(data).sort((a , b) => {
            if(a[1] > b[1]) return 1;
            if(a[1] < b[1]) return -1;
            return 0;
          }).forEach(el => {
            let bloodType: string = '';
            switch (el[0]) {
              case 'positiveA': bloodType = 'A+'; break;
              case 'negativeA': bloodType = 'A-'; break;
              case 'positiveB': bloodType = 'B+'; break;
              case 'negativeB': bloodType = 'B-'; break;
              case 'positiveAB': bloodType = 'AB+'; break;
              case 'negativeAB': bloodType = 'AB-'; break;
              case 'positiveO': bloodType = 'O+'; break;
              case 'negativeO': bloodType = 'O-'; break;
            }
            chartData.push({
              name: bloodType,
             y:el[1]
            })
          })
          this.chartOptions.series[0] = {type:'pie', data: chartData};
          this.updateChart = true;
        }
      });
  }
}
