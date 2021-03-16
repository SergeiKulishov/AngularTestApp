import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError,tap } from "rxjs/operators";
import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
  private productUrl = 'api/products/products.json';

  constructor(private http : HttpClient) {}

    getProduct(): Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productUrl).pipe(
          tap(data => console.log("All"+ JSON.stringify(data))),
          catchError(this.handleError)
          );
    }
   private handleError(err: HttpErrorResponse) {
     // in real world app, we may send the server to some remote logging infrastructure
     //instead of just logging it to the console
     let errorMesage = "";
     if(err.error instanceof ErrorEvent){
       // A client-side or network error occured.Handle it accordingly 
       errorMesage = `An error occured : ${err.error.message}`;
     }else{
       // the backend returned an unsuccesseful esponce code
       //The responce body may contain clues as to what went wrong,
       errorMesage = `Server returned code : ${err.status}, error message is ${err.message}`; 
     }
     console.error(errorMesage);
     return throwError(errorMesage);
   }
}