import { Component } from '@angular/core';
import { ObesePercentagesService } from './obese-percentages.service';
import * as Highcharts from 'highcharts'

@Component({
  selector: 'app-obese-percentages',
  templateUrl: './obese-percentages.component.html',
  styleUrls: ['./obese-percentages.component.css']
})
export class ObesePercentagesComponent {

  Highcharts = Highcharts;
  updateChart: boolean = false;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'column',
      borderRadius:10,
      height: '80%'
    },
    title: {
      text: 'Número de obesos entre homens e mulheres'
    },
    xAxis: {
      categories: [
        'Homens',
        'Mulheres'
      ]
    },
    yAxis: [{
      min: 0,
      title: {
        text: 'Quantidade de Obesos'
      },
      labels:{
        enabled:true, format: "{point.y:.1f}"
      }
    }],
    legend: {
      shadow: true
    },
    tooltip: {
      headerFormat: '<span style = "font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style = "color:{series.color};padding:0">{series.name}: </td>' +
        '<td style = "padding:0"><b>{point.y:.0f} {point.text} </b></td></tr>',
         footerFormat: '</table>', shared: true, useHTML: true
    },
    plotOptions: {
      column: {
        grouping: false,
        shadow: true,
        borderWidth: 0,
        dataLabels:{enabled:true}
      }
    },
    series: [{
      name: 'Obesos',
      color: 'rgba(255,0,255,1)',
      type:'column',
    }, {
      name: 'Total',
      color: 'rgba(255,192,203,.9)',
      type:'column',
      pointPadding: 0.4,
      pointPlacement: -0.2
    }]
};

  constructor(
    private obesePercentagesService: ObesePercentagesService
  ){}

  ngAfterViewInit(): void {
    this.obesePercentagesService.getObesePercentages()
    .subscribe(data => {
      if(this.chartOptions.series !== undefined && data){
        this.chartOptions.series = [{
          name: 'Obesos',
          color: 'rgba(255,0,255,1)',
          type:'column',
          data: [{y:data.obeseMenPercentage,dataLabels:{enabled:true, format:'{point.y:.0f}%'}, text:`% -> ${data.obeseMen} homens`},
             {y:data.obeseWomenPercentage, dataLabels:{enabled:true, format:'{point.y:.0f}%'}, text:`% -> ${data.obeseWomen} mulheres`}]
        }, {
          name: 'Total',
          color: 'rgba(255,192,203,.9)',
          type:'column',
          data: [{y:data.totalMen},
             {y:data.totalWomen}],
          pointPadding: 0.4,
          pointPlacement: -0.2
        }]
        this.updateChart = true;
      }
    })  
  }

}
