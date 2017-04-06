import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  chartData: any[];
  count: number[];
  datasets: any[];
  /* "#68B6DD","#FED403"*/
  colorsOverride: Array<Color> = [{
    backgroundColor: [
      "#ECEAEB",
      "#3F51B5"
    ],
    hoverBackgroundColor: [
      "#ECEAEB",
      "#3F51B5"
    ]
  }];
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
        if (err.status == 401) {
          this.CS.showDialog(err);
        } else {
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
      this.datasets = [
        {
          data: dataArr,
          backgroundColor: [
            "#f8cb00",
            "#F86C6B"
          ],
          hoverBackgroundColor: [
            "#F9D533",
            "#FA9797"
          ]
        }];
      temp["label"] = labels;
      //temp["data"] = dataArr;
      temp["datasets"] = this.datasets;
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
