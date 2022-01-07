import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  api: string = environment.api;

  constructor(private http: HttpClient) { }

  getCharactersPagination = (page: number) => {
    return this.http.get<any>(`${this.api}/character?page=${page}`)
      .pipe(
        response => response,
        error => error
      );
  }

  getCharactersByNamePagination(page: number, name: string) {
    return this.http.get<any>(`${this.api}/character?page=${page}&name=${name}`)
      .pipe(
        response => response,
        error => error
      );
  }

  getSingleCharacter(id: string) {
    return this.http.get<any>(`${this.api}/character/${id}`)
      .pipe(
        response => response,
        error => error
      );
  }

  getMultipleCharacters(characters: Array<string>) {
    return this.http.get<any>(`${this.api}/character/${characters}`)
      .pipe(
        response => response,
        error => error
      );
  }
}
