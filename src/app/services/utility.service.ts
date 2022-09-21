import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  private decode(value: string) {
    const pl = /\+/g;
    return decodeURIComponent(value.replace(pl, " "));
  }

  generateUrlQueryParams(url: string): { path: string, queryParams?: { [key: string]: string } } {
    const decodeUrl = this.decode(url);
    if (!decodeUrl.includes('?')) {
      return {
        path: url
      }
    }

    const splitUrl = decodeUrl.split('?');

    if (splitUrl.length <= 1) return {
      path: splitUrl[0]
    };

    const path = splitUrl[0];
    const queryString = splitUrl[1];

    let queryParams: {
      [key: string]: string
    } = {};

    const searchParams = new URLSearchParams(queryString);

    searchParams.forEach((value, key) => {
      queryParams[key] = value;
    })

    return {
      path,
      queryParams
    }
  }


}
