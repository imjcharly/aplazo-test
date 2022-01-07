import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  api: string = environment.api;

  constructor(private http: HttpClient) { }

  getEpisodesPagination = (page: number) => {
    return this.http.get<any>(`${this.api}/episode?page=${page}`)
      .pipe(
        response => response,
        error => error
      );
  }

  getEpisodesByNamePagination(page: number, name: string) {
    return this.http.get<any>(`${this.api}/episode?page=${page}&name=${name}`)
      .pipe(
        response => response,
        error => error
      );
  }
}
