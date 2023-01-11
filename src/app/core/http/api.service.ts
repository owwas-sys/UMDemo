import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { ApiType } from '@app/shared/enums/enums';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CredentialsService } from '@app/core/auth/credentials.service';
import { LoginToken } from '@app/models/response-models/login-token';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
// import { LoaderService } from '@app/core/loader.service';
// import { AlertService } from '@app/core/alert.service';

const { coreUrl, apiUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private unsubscribeRequest: Subject<boolean> = new Subject<boolean>();
  private tokenTimeOut: any;
  private date: any;
  constructor(
    private httpClient: HttpClient,
    private credentialsService: CredentialsService,
    private storageService: StorageService,
    private router: Router,
    // private loaderService: LoaderService,
    // private alertService: AlertService
  ) {}

  get<T>(urlType: ApiType, relativeUrl: string, forceUpdate: boolean = true): Observable<T> {
    if (this.verifyTokenTimeOut()) {
      let baseUrl = urlType === ApiType.CORE_API ? coreUrl : apiUrl;
      return this.httpClient
        // .cache(forceUpdate)
        .get<T>(baseUrl + relativeUrl)
        .pipe(takeUntil(this.unsubscribeRequest));
    } else {
      this.autoLogout()
    }
  }

  post<T>(urlType: ApiType, relativeUrl: string, obj: any): Observable<T> {
    if (this.verifyTokenTimeOut()) {
      let baseUrl = urlType === ApiType.CORE_API ? coreUrl : apiUrl;
      return this.httpClient.post<T>(baseUrl + relativeUrl, obj).pipe(takeUntil(this.unsubscribeRequest));
    } else {
      this.autoLogout();
    }
  }

  put<T>(urlType: ApiType, relativeUrl: string, obj: any): Observable<T> {
    if (this.verifyTokenTimeOut()) {
      let baseUrl = urlType === ApiType.CORE_API ? coreUrl : apiUrl;
      return this.httpClient.put<T>(baseUrl + relativeUrl, obj);
    } else {
      this.autoLogout();
    }
  }

  delete<T>(urlType: ApiType, relativeUrl: string): Observable<T> {
    if (this.verifyTokenTimeOut()) {
      let baseUrl = urlType === ApiType.CORE_API ? coreUrl : apiUrl;
      return this.httpClient.delete<T>(baseUrl + relativeUrl);
    } else {
      this.autoLogout();
    }
  }

  unsubscribeAllRequest() {
    this.unsubscribeRequest.next(true);
    this.unsubscribeRequest.complete();
  }

  refreshToken() {
    return this.post<any>(ApiType.CORE_API, 'login/refresh', this.credentialsService.credentials).pipe(
      tap((loginToken: LoginToken) => {
        this.credentialsService.setCredentials(loginToken);
        location.reload();
      })
    );
  }

  verifyTokenTimeOut() {
    this.date = new Date();
    this.tokenTimeOut = new Date(this.storageService.getItem('TokenTimeOut'));
    this.date = new Date(this.date.getTime() - 30 * 60000);
    if (this.tokenTimeOut < this.date) {
      return false;
    } else {
      this.storageService.setItem('TokenTimeOut', Date());
      return true;
    }
  }

  autoLogout() {
    // this.loaderService.hide();
    this.storageService.removeItem('UsersCredentials');
    this.storageService.removeItem('TokenTimeOut');
    this.credentialsService.removeCredentials();
    this.router.navigate(['/session-out'], { replaceUrl: true });
  }
}
