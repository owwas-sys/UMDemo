import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { ApiType } from '@app/shared/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private apiService: ApiService) { }

  getAllRoles() {
    return this.apiService.get<any>(ApiType.API, 'roles/GetAllRoles');
  }
}
