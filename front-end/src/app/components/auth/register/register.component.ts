import { Router } from '@angular/router';
import { UserService } from './../../../shard/servicrs/user.service';
import { User } from './../../../shard/models/register.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userSer: UserService, private router: Router) { }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    confirmPassword: new FormControl('', Validators.required),
  })
  get name(): any { return this.form.get('name') }
  get phone(): any { return this.form.get('phone') }
  get password(): any { return this.form.get('password') }
  get email(): any { return this.form.get('email') }
  get confirmPassword(): any { return this.form.get('confirmPassword') }
  registerSave() {
    let data: User = {
      name: this.name.value,
      password: this.password.value,
      phone: this.phone.value,
      email: this.email.value,
      confirmPassword: this.confirmPassword.value
    }
    this.userSer.register(data).subscribe((res: any) => {
      if (res.data) {
        this.router.navigate(['/login'])
      }
      console.log(res);
      
    }, (err: any) => {
      console.log(err);

    })
  }
  ngOnInit(): void {
  }

}
