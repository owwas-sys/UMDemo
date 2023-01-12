import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/http/api.service';
import { ApiType } from '@app/shared/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class UserGroupsService {

  constructor(private apiService: ApiService) { }

  getAllGroups() {
    return this.apiService.get<any>(ApiType.API, 'groups/GetAllGroups');
  }
}
