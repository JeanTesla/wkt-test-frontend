import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AgeRangeImcService } from './age-range-imc.service';

@Component({
  selector: 'app-age-range-imc',
  templateUrl: './age-range-imc.component.html',
  styleUrls: ['./age-range-imc.component.css']
})
export class AgeRangeImcComponent implements AfterViewInit{

  updateChart: boolean = false;

  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      width: 930,
      height: '45%',
      borderRadius:10
    },
    title: {
      text: 'IMC por faixa etária'
    },
    subtitle: {
      text: 'Source: WorldClimate.com'
    },
    xAxis: {
      categories: [],
      crosshair: true
    },
    yAxis: {
      min: 0,
      title: {
        text: 'IMC'
      }
    },
    tooltip: {
      headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
        '<td style = "padding:0"><b>{point.y:.1f} </b></td></tr>', footerFormat: '</table>', shared: true, useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        dataLabels:{enabled:true, format:'{point.y:.1f}'}
      }
    },
    series: [{
      name: 'Imc',
      type: 'column',
      data: [],
    }]
  };

  constructor(private ageRangeImcService: AgeRangeImcService){}

  ngAfterViewInit(): void {
    this.ageRangeImcService.getAgeRangeImcs()
    .subscribe(data => {
      if(this.chartOptions.series !== undefined && data.length > 0){
        let ranges: string[] = [];
        let imcs: number[] = [];
        data.forEach(el => {
          ranges.push(el.range)
          imcs.push(el.imc);
        })
        this.chartOptions.xAxis = {categories:ranges}
        this.chartOptions.series[0] = {type: "column", data: imcs}; 
        this.updateChart = true;
      }
    })  
  }

}
