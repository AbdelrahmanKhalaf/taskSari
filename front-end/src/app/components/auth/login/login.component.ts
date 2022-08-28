import { Router } from '@angular/router';
import { UserService } from './../../../shard/servicrs/user.service';
import { Login } from './../../../shard/models/login,interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private serviceU: UserService,
    private router : Router
    ) { }
  public errorMessage: any
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  })
  get email(): any {
    return this.form.get('email')
  }
  get password(): any {
    return this.form.get('password')
  }
  saveNew() {
    let data: Login = {
      email: this.email.value,
      password: this.password.value
    }
    this.serviceU.login(data).subscribe((res: any) => {
      if(res){
        localStorage.setItem('token',res.bearer)
        this.router.navigate(['/home'])
      }
    }, (err: any) => {
      console.log(err);
    })
  }
  ngOnInit(): void {
  }

}
