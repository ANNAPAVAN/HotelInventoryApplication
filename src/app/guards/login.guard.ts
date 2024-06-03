import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../login/login.service";


export const loginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router: Router = inject(Router);
  const loginService = inject(LoginService);
  return loginService.isLoggedIn? true: router.navigate(['/login']);
}

export const loginLoad: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router: Router = inject(Router);
  const loginService = inject(LoginService);
  return loginService.isLoggedIn ? true : router.createUrlTree(['/login']);
}