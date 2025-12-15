import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Gender, Product, ProductResponse } from '@products/interfaces/product.interface';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

const newProduct: Product = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  slug: '',
  stock: 0,
  sizes: [],
  gender: Gender.Men,
  tags: [],
  images: [],
};

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

  getProductById(id: string) {
    if (id === 'new') {
      return of(newProduct);
    }
    if (this.productCache.has(id)) {
      return of(this.productCache.get(id));
    }
    return this.http
      .get<Product>(`${baseUrl}/products/${id}`)
      .pipe(tap((resp) => this.productCache.set(id, resp)));
  }

  updateProductById(
    id: string,
    productLike: Partial<Product>,
    imgFileList?: FileList
  ): Observable<Product> {
    const currentImages = productLike.images ?? [];
    return this.uploadImages(imgFileList).pipe(
      map((imageNames) => ({ ...productLike, images: [...currentImages, ...imageNames] })),
      switchMap((updatedProduct) =>
        this.http.patch<Product>(`${baseUrl}/products/${id}`, updatedProduct)
      )
    );
  }

  createProduct(productLike: Partial<Product>, imgFileList?: FileList): Observable<Product> {
    const currentImages = productLike.images ?? [];
    return this.uploadImages(imgFileList).pipe(
      map((imageNames) => ({ ...productLike, images: [...currentImages, ...imageNames] })),
      switchMap((updatedProduct) => this.http.post<Product>(`${baseUrl}/products`, updatedProduct))
    );
  }

  uploadImages(images?: FileList): Observable<string[]> {
    if (!images) return of([]);
    const uploadObservables = Array.from(images).map((algo) => this.uploadImage(algo));
    return forkJoin(uploadObservables);
  }

  private uploadImage(imageFile: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', imageFile);
    return this.http
      .post<{ fileName: string }>(`${baseUrl}/files/product`, formData)
      .pipe(map((response) => response.fileName));
  }
}
