import { UserService } from './../servicrs/user.service';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGurde {
  constructor(private auth: UserService, private router: Router) {}
  canActivate(route:any, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return true;
  }
}
