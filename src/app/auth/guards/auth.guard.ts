import { Injectable, inject } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivateFn,
    CanMatchFn,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
  } from '@angular/router';
import { AuthService } from '../services/auth-service.service';
import { Observable, tap } from 'rxjs';


  const checkAuthStatus = (): boolean | Observable<boolean> => {
    //se inyectan el AuthService y el Router
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
   
    return authService.checkAuth().pipe(
      tap( isAutehnticated => console.log('Authenticated', isAutehnticated)),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          router.navigate(['/auth/login']);
        }
      })
    );
  };

  export const canActivateGuard: CanActivateFn = ( //Hay que tener en cuenta el tipado CanActiveFn
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
//   console.log('CanActivate');
//   console.log({ route, state });
 
  return checkAuthStatus();
};

export const canMatchGuard: CanMatchFn | boolean= ( //Tipado CanMatchFN
  route: Route,
  segments: UrlSegment[]
) => {
//   console.log('CanMatch');
//   console.log({ route, segments });
 
  return checkAuthStatus();
};
@Injectable({providedIn: 'root'})
export class AuthGuard  {
    constructor() { }
    
}