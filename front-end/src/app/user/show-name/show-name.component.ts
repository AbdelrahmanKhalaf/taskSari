import { UserService } from './../../shard/servicrs/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-name',
  templateUrl: './show-name.component.html',
  styleUrls: ['./show-name.component.css']
})
export class ShowNameComponent implements OnInit {
  public Id: any
  public name :any
  constructor(private route: ActivatedRoute, private userServ: UserService) { }

  ngOnInit(): void {
    this.Id = this.route.snapshot.paramMap.get('id')
    this.userServ.getName(this.Id).subscribe((res:any)=>{
      console.log(res);
      this.name = res[0]
      
    })
  }


}
