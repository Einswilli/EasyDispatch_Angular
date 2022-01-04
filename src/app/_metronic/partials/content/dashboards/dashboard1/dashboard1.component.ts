import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../core';
import {ChartDataSets, ChartOptions, } from 'chart.js';
import {Color, Label} from 'ng2-charts';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
})
export class Dashboard1Component implements OnInit {
  constructor() {}
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 35, 90, 110, 100, 120], label: 'COMMANDES' },
  { data: [45, 89, 75, 81, 85, 44, 60, 75, 67, 90, 109, 95], label: 'PRODUITS' },
  ];
  public lineChartLabels: Label[] = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'auout', 'septembre', 'octobre', 'novembre', 'decembre'];
  public lineChartOptions: (ChartOptions & { annotation ?: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];


  ngOnInit(): void {}
}
