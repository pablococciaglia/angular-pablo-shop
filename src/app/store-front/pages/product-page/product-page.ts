import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/product.service';
import { Carrousel } from '@products/components/carrousel/carrousel';

@Component({
  selector: 'app-product-page',
  imports: [Carrousel],
  templateUrl: './product-page.html',
})
export class ProductPage {
  productService = inject(ProductService);
  router = inject(ActivatedRoute);
  idSlug: string = this.router.snapshot.params['idSlug'];

  productResource = rxResource({
    params: () => ({}),
    stream: (req) => {
      return this.productService.getProductByIdSlug(this.idSlug);
    },
  });
}
