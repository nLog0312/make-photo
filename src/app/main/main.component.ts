import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  tabs = [
    {
      name: 'Chụp ảnh',
      icon: 'camera',
      type: 1
    },
    {
      name: 'Tải ảnh lên',
      icon: 'upload',
      type: 2
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
