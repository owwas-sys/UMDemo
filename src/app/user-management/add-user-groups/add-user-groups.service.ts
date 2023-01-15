import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { AddRole } from '@app/models/addRole.model';
import { ApiType } from '@app/shared/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class AddUserGroupsService {

  constructor(private apiService: ApiService) { }

  addRole(role: AddRole) {
    return this.apiService.post<any>(ApiType.API, 'roles/AddNewUserGroup', role);
  }
}
