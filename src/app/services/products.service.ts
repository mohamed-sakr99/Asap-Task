import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IProduct } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  // get Product List
  getAllProduct(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${environment.BASE_API_URL}/products`)
  }


  // get Single Product By ID
  getSingleProduct(id: number) {
    return this.http.get<IProduct>(`${environment.BASE_API_URL}/products/${id}`)

  }


  // update single Product 
  updateProduct(id: number, data: IProduct) {
    return this.http.put<IProduct>(`${environment.BASE_API_URL}/products/${id}`, data)
  }


  // Add New Product 
  AddNewProduct(data: IProduct) {
    return this.http.post<IProduct>(`${environment.BASE_API_URL}/products`, data)

  }


  // Delete Product
  deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(`${environment.BASE_API_URL}/products/${id}`)
  }



  // get All Categories
  getProductCategories() {
    return this.http.get(`${environment.BASE_API_URL}/products/categories`)
  }

}
