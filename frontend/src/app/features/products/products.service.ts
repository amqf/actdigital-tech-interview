import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiService = inject(ApiService);
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  public products$ = this.productsSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();

  loadProducts(): void {
    this.loadingSubject.next(true);
    
    this.apiService.get<Product[]>('/products')
      .pipe(
        tap(products => {
          this.productsSubject.next(products);
          this.loadingSubject.next(false);
        })
      )
      .subscribe({
        error: () => this.loadingSubject.next(false)
      });
  }

  getProductById(id: number): Observable<Product> {
    return this.apiService.get<Product>(`/products/${id}`);
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.apiService.post<Product>('/products', product)
      .pipe(
        tap(newProduct => {
          const currentProducts = this.productsSubject.value;
          this.productsSubject.next([...currentProducts, newProduct]);
        })
      );
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.apiService.put<Product>(`/products/${id}`, product)
      .pipe(
        tap(updatedProduct => {
          const currentProducts = this.productsSubject.value;
          const index = currentProducts.findIndex(p => p.id === id);
          
          if (index !== -1) {
            const newProducts = [...currentProducts];
            newProducts[index] = updatedProduct;
            this.productsSubject.next(newProducts);
          }
        })
      );
  }

  deleteProduct(id: number): Observable<void> {
    return this.apiService.delete<void>(`/products/${id}`)
      .pipe(
        tap(() => {
          const currentProducts = this.productsSubject.value;
          const filteredProducts = currentProducts.filter(p => p.id !== id);
          this.productsSubject.next(filteredProducts);
        })
      );
  }
}

