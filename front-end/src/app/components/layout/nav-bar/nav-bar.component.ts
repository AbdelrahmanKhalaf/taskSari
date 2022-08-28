import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  constructor(private router : Router) { }

  ngOnInit(): void {
    console.log(this.token);
    
  }
  get token() {
    return localStorage.getItem('token')
  }
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

}
