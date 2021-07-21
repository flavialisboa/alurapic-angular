import { Injectable } from '@angular/core';
import * as jtw_decode from 'jwt-decode';

const KEY = 'authToken';

@Injectable({ providedIn: 'root' })
export class TokenService {

  hasToken() {
    return !!this.getToken();
  }

  setToken(token) {
    window.localStorage.setItem(KEY, token);
  }

  getToken() {
    return window.localStorage.getItem(KEY);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }

  hasExpired() {
    if (this.hasToken()) {
      const token = jtw_decode(this.getToken());
      const currentTime = Date.now() / 1000;
      return token.exp < currentTime;
    }
    return false;
  }
}
