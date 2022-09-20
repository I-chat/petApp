import { Injectable } from "@angular/core";

interface SetCookieInterface {
  name: string;
  value: any;
  expires?: Date | number,
  path?: string,
  domain?: string,
  secure?: boolean,
  sameSite?: 'Lax' | 'None' | 'Strict'
}


@Injectable({
  providedIn: 'root'
})
export class CookieService {
  constructor() {}

  set({ name, value, expires, path, domain, secure, sameSite = 'Lax' }: SetCookieInterface): void {
    let cookieString: string = encodeURIComponent(name) + '=' + encodeURIComponent(value) + ';';
    if (expires) {
      if (typeof expires === 'number') {
        const /** @type {?} */ dateExpires: any = new Date(new Date().getTime() + expires * 1000 * 60 * 60 * 24);
        cookieString += 'expires=' + dateExpires.toUTCString() + ';';
      }
      else {
        cookieString += 'expires=' + expires.toUTCString() + ';';
      }
    }
    if (path) {
      cookieString += 'path=' + path + ';';
    }
    if (domain) {
      cookieString += 'domain=' + domain + ';';
    }
    if (secure) {
      cookieString += 'secure;';
    }
    cookieString += 'sameSite=' + sameSite + ';';
    document.cookie = cookieString;
  }

  get(name: string): any | null {
    if (this.check(name)) {
      name = encodeURIComponent(name);
      const regExp = this.getCookieRegExp(name);
      const result = regExp.exec(document.cookie) || '';
      return decodeURIComponent(result[1]);
    } else {
      return null;
    }
  }

  check(name: string): boolean {
    name = encodeURIComponent(name);
    const regExp = this.getCookieRegExp(name);
    const exists = regExp.test(document.cookie);
    return exists;
  }

  getCookieRegExp(name: string) {
    const escapedName = name.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/ig, '\\$1');
    return new RegExp('(?:^' + escapedName + '|;\\s*' + escapedName + ')=(.*?)(?:;|$)', 'g');
  }

}
