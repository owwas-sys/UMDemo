import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { LoginToken } from '@app/models/response-models/login-token';
import { ApiType } from '@app/shared/enums/enums';
import { Login } from '@app/models/login.model';
import { tap } from 'rxjs/operators';
import { CredentialsService } from '@app/core/auth/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private apiService: ApiService, private credentialsService: CredentialsService) {}

  login(login: Login) {
    return this.apiService.post<LoginToken>(ApiType.API, 'auth/login', login);
  }

  refreshToken() {
    return this.apiService.post<any>(ApiType.API, 'login/refresh', this.credentialsService.credentials).pipe(
      tap((loginToken: LoginToken) => {
        this.credentialsService.setCredentials(loginToken);
      })
    );
  }
}
