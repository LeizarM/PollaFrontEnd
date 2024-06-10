import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';

@Component({
  selector: 'app-Layout',
  templateUrl: './Layout.component.html',
  styleUrls: ['./Layout.component.css']
})
export class LayoutComponent implements OnInit {



  @ViewChild(SidebarComponent) appSidebar!: SidebarComponent;

  @ViewChild(NavbarComponent) appTopbar!: NavbarComponent;


  constructor() { }

  ngOnInit() {
  }

}
