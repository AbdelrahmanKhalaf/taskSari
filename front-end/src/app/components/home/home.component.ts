import { UserService } from './../../shard/servicrs/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user : any
  constructor(private userSer: UserService) { }

  ngOnInit(): void {
    this.userSer.getUser().subscribe((res:any)=>{
      this.user = res.name
      
    })
  }

}
