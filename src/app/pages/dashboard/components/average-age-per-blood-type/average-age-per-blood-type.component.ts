import { Component, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { AverageAgePerBloodTypeService } from './average-age-per-blood-type.service';

@Component({
  selector: 'app-average-age-per-blood-type',
  templateUrl: './average-age-per-blood-type.component.html',
  styleUrls: ['./average-age-per-blood-type.component.css']
})
export class AverageAgePerBloodTypeComponent implements AfterViewInit {

  updateChart: boolean = false;

  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    
    chart: {
      type: 'bar',
      width: 930,
      height: '45%',
      borderRadius:10
    },
    title: {
      text: 'Idade média dos doadores para cada tipo de sangue',
      align: 'center'
    },
    xAxis: {
      categories: ['Idade média'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Idade',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      shadow: true
    },
    credits: {
      enabled: false
    },
    series: [{
      type: 'column',
      name: '',
      data: []
    }, {
      type: 'column',
      name: '',
      data: []
    }, {
      type: 'column',
      name: '',
      data: []
    }, {
      type: 'column',
      name: '',
      data: []
    }, {
      type: 'column',
      name: '',
      data: []
    }, {
      type: 'column',
      name: '',
      data: []
    }, {
      type: 'column',
      name: '',
      data: []
    }, {
      type: 'column',
      name: '',
      data: []
    }]
  };

  constructor(private averageAgePerBloodTypeService: AverageAgePerBloodTypeService) { }

  ngAfterViewInit(): void {
    this.averageAgePerBloodTypeService.getAverageAgePerBloodType()
      .subscribe(data => {
        if (this.chartOptions.series !== undefined && data.length > 0) {
          let chartData: any[] = [];
          data.forEach(el => {
            chartData.push({
              type: 'column',
              name: el.bloodType,
              data: [el.averageAge]
            })
          })
          this.chartOptions.series = chartData;
          this.updateChart = true;
        }
      })
  }

}
