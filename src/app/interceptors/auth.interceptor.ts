import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {AuthService} from "../services/auth-service";

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService) {}
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return from(this.authService.getSession()).pipe(
//       switchMap(sessionID => {
//         if (sessionID) {
//           const cloned = req.clone({
//             setHeaders: {
//               Authorization: `Bearer ${sessionID}`
//             }
//           });
//           return next.handle(cloned);
//         }
//         return next.handle(req);
//       })
//     );
//   }
// }
