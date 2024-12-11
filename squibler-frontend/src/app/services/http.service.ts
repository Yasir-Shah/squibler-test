import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { catchError, retry, finalize } from "rxjs/operators";
import { environment } from "../../environments/environments";
import { timeout } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  public 32: boolean = false;
  // BehaviorSubject to track loading state
  private isLoading = new BehaviorSubject<boolean>(false);
  private loader: any;

  private baseUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {}

  // Expose loading state as an Observable
  get loading$(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  // Handle HTTP errors
  private handleError(error: any) {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error?.detail || `Server error: ${error.status} - ${error.statusText}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  

  // Set default HTTP headers
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        // Add any other headers here
      }),
    };
  }

  // Display loading spinner
  public showLoader() {
    
  }

  // Hide loading spinner
  private async hideLoader() {
    
  }

  // HTTP GET request
  get(url: string): Observable<any> {
    // this.showLoader();
    return this.http.get(this.baseUrl + url).pipe(
      timeout(10000), // Set timeout of 10 seconds
      retry(3), // Retry failed request up to 3 times
      catchError((error) => this.handleError(error)),
      finalize(() => {
        console.log("Request finalized, hiding loader");
        this.hideLoader();
      })
    );
  }

  getData(url: string): Observable<any> {
    // this.showLoader();
    return this.http.get(this.baseUrl + url).pipe(
      timeout(10000), // Set timeout of 10 seconds
      retry(3), // Retry failed request up to 3 times
      finalize(() => {
        console.log("Request finalized, hiding loader");
        this.hideLoader();
      })
    );
  }

  // HTTP POST request
  post(url: string, body: any): Observable<any> {
    this.showLoader();
    return this.http.post(this.baseUrl + url, body, this.getHttpOptions()).pipe(
      catchError((error) => this.handleError(error)),
      finalize(() => this.hideLoader())
    );
  }

  // HTTP PUT request
  put(url: string, body: any): Observable<any> {
    this.showLoader();
    return this.http.put(this.baseUrl + url, body, this.getHttpOptions()).pipe(
      catchError((error) => this.handleError(error)),
      finalize(() => this.hideLoader())
    );
  }

  // HTTP DELETE request
  delete(url: string): Observable<any> {
    this.showLoader();
    return this.http.delete(this.baseUrl + url, this.getHttpOptions()).pipe(
      catchError((error) => this.handleError(error)),
      finalize(() => this.hideLoader())
    );
  }

  // HTTP PATCH request
  patch(url: string, body: any): Observable<any> {
    this.showLoader();
    return this.http.patch(this.baseUrl + url, body, this.getHttpOptions()).pipe(
      catchError((error) => this.handleError(error)),
      finalize(() => this.hideLoader())
    );
  }
}
