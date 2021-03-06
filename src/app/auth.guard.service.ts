import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot
    ): boolean | Promise<boolean> | Observable<boolean> {
    return this.authService.successfullLogin.pipe(map(user => {
          console.log('loggedin status from AuthGuard', user);
          return user;
    }), tap(isAuth => {
        if (!isAuth) {
          return this.router.navigate(['/sign-in']);
        }
    }));
  }
}
