import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const _auth = inject(AuthService);
  const _router = inject(Router);

  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    request = addToken(request, accessToken);
  }

  return next(request).pipe(
    catchError((error) => {
      console.log(error);
      // Check if the error is due to an expired access token
      if (error.status === 401 && accessToken) {
        console.log("error 401")
        return handleTokenExpired(request, next, _auth, _router);
      }

      return throwError(() => error);
    })
  );

};

function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function handleTokenExpired(request: HttpRequest<any>, next: HttpHandlerFn, _auth: AuthService, _router: Router): Observable<HttpEvent<any>> {
  // Call the refresh token endpoint to get a new access token
  return _auth.refreshTokens().pipe(
    switchMap(() => {
      const newAccessToken = localStorage.getItem('accessToken')!;
      // Retry the original request with the new access token
      return next(addToken(request, newAccessToken));
    }),
    catchError((error) => {
      _auth.logout();
      _router.navigate(["login"]);
      // Handle refresh token error (e.g., redirect to login page)
      console.error('Error handling expired access token:', error);
      return throwError(() => error);
    })
  );
}
