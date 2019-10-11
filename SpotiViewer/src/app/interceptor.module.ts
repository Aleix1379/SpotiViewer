import {Injectable, NgModule} from '@angular/core';
import {Observable} from 'rxjs';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {LocalStorageService} from './services/localStorage/local-storage.service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.localStorageService.getAccessToken();

    const dupReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${accessToken}`)});
    return next.handle(dupReq);
  }
}

@NgModule({
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true}
  ]
})
export class InterceptorModule {
}
