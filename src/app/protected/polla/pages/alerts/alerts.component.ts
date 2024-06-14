import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  @Input() message: string | null = null;
  @Input() type: 'success' | 'error' = 'success';

  constructor() { }

  ngOnInit() {
  }

}
