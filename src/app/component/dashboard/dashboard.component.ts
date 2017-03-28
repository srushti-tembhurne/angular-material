import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData: number[] = [350, 450, 100];
  public doughnutChartType: string = 'doughnut';
  chartData: any[];
  count: number[];


  constructor(private CS: CommonService) {
    this.chartData = [];
    this.count = [1, 2, 3, 4, 5];
  }
  ngOnInit() {
    this.CS.getService('/api/v1/requests/inventory').subscribe(
      data => {
        this.drawChart(data.data);
      },
      err => { 
          if(err.status==401)
        {
          this.CS.showDialog(err);
        }else{
          this.CS.ShowErrorDialog(err);
        }
      },
      () => { }
    );
  }
  

  drawChart(data) {
    let labels: any[];
    let dataArr: any[];
    for (let props of data) {

      let temp = {};
      labels = [], dataArr = [];
      for (let prop in props) {
        switch (prop) {
          case "name":
            temp["name"] = props[prop];
            break;
          case "available_qty":
          case "used_qty":
         /* case "total_qty":*/
            labels.push(prop);
            dataArr.push(props[prop]);
            break;
        }
      }
      temp["label"] = labels;
      temp["data"] = dataArr;
      temp["chart"] = "doughnut";
      this.chartData.push(temp);
    }    
  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
