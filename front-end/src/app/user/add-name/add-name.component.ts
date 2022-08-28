import { UserService } from './../../shard/servicrs/user.service';
import { IaddName } from './../../shard/models/name.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-name',
  templateUrl: './add-name.component.html',
  styleUrls: ['./add-name.component.css']
})
export class AddNameComponent implements OnInit {

  constructor(private userServ: UserService, private router: Router) { }
  public errorMessage: any
  ngOnInit(): void {
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  })
  get name(): any {
    return this.form.get('name')
  }
  get lastName(): any {
    return this.form.get('lastName')
  }
  addName() {
    let data: IaddName = {
      name: this.name.value,
      lastName: this.lastName.value
    }
    this.userServ.addName(data).subscribe((res: any) => {
      if (res.user) {
        this.router.navigate([`showName/${res.user._id}`])
      }
    }, (err: any) => {
      if (err) {
        console.log(err);
        this.errorMessage = err.error.error
      }
    })
  }
}
