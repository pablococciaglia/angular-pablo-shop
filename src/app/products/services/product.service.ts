import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Gender, Product, ProductResponse } from '@products/interfaces/product.interface';
import { of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: Gender;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private productsCache = new Map<string, ProductResponse>();
  private productCache = new Map<string, Product>();

  getProducts(options: Options) {
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`;
    if (this.productsCache.has(key)) {
      return of(this.productsCache.get(key));
    }

    return this.http
      .get<ProductResponse>(`${baseUrl}/products`, {
        params: { limit, offset, gender },
      })
      .pipe(tap((resp) => this.productsCache.set(key, resp)));
  }

  getProductByIdSlug(idSlug: string) {
    if (this.productCache.has(idSlug)) {
      return of(this.productCache.get(idSlug));
    }
    return this.http
      .get<Product>(`${baseUrl}/products/${idSlug}`)
      .pipe(tap((resp) => this.productCache.set(idSlug, resp)));
  }
}
