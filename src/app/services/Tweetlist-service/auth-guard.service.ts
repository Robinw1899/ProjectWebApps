import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService:AuthenticationService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): boolean {
    console.log(this.authService);
    console.log(this.authService.user$);
    console.log(this.authService.user$.getValue());
    if (this.authService.user$.getValue()) {
      return true;
    }
    this.authService.redirectUrl = state.url;
    this.router.navigate(['/login']);

    return false;
  }
}