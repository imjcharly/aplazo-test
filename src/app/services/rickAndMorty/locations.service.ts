import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  api: string = environment.api;

  constructor(private http: HttpClient) { }

  getLocationsPagination(page: number) {
    return this.http.get<any>(`${this.api}/location?page=${page}`)
      .pipe(
        response => response,
        error => error
      );
  }

  getLocationsByNamePagination(page: number, name: string) {
    return this.http.get<any>(`${this.api}/location?page=${page}&name=${name}`)
      .pipe(
        response => response,
        error => error
      );
  }

}
