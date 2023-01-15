import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { ApiType } from '@app/shared/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private apiService: ApiService) { }

  getAllUsers() {
    return this.apiService.get<any>(ApiType.API, 'user/GetAllUsers');
  }
}
