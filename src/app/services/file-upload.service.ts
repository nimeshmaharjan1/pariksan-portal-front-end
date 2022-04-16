import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import baseUrl from "./helper";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  // API url

  constructor(private http: HttpClient) {
  }

  // Returns an observable
  upload(file): Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file);

    // Make http post request over api
    // with formData as req
    return this.http.post(`${baseUrl}/question/upload`, formData)
  }
}
