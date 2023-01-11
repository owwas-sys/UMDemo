import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import { LoginToken } from '@app/models/response-models/login-token';
// import { UserProfile } from '@app/response-models/user-profile.model';

const credentialsKey = 'naqaba-credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class CredentialsService {
  private _credentials: LoginToken | null = null;

  constructor(private storageService: StorageService) {
    const savedCredentials = this.storageService.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = savedCredentials;
    }
  }

  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): LoginToken | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   */
  setCredentials(credentials?: LoginToken) {
    this._credentials = credentials || null;

    if (credentials) {
      this.storageService.setItem(credentialsKey, credentials);
    } else {
      this.storageService.removeItem(credentialsKey);
    }
  }

  // setUserProfile(userProfile: UserProfile) {
  //   if (Object.keys(userProfile).length > 0) {
  //     const data = {
  //       firstName: userProfile.firstName,
  //       middleName: userProfile.middleName,
  //       lastName: userProfile.lastName,
  //       profilePicturePath: userProfile.profilePicturePath,
  //       userTypeId: userProfile.userTypeId,
  //       customerId: userProfile.customerId,
  //       id: userProfile.id
  //     };
  //     this.storageService.setItem('userProfile', data);
  //   }
  // }

  removeCredentials() {
    this._credentials = null;
    this.storageService.removeItem(credentialsKey);
    this.storageService.removeItem('userProfile');
    this.storageService.removeItem('profile-maintenance');
    this.storageService.removeItem('profile-setting');
    this.storageService.removeItem('CustomerAccount');
    this.storageService.removeItem('TokenTimeOut');
    this.storageService.removeItem('CustomerAccountName');
    // this.storageService.clearAll();
  }
}
