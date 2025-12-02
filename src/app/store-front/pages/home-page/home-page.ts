import { Component, inject } from '@angular/core';
import { Card } from '@products/components/card/card';
import { ProductService } from '@products/services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Pagination } from '@shared/components/pagination/pagination';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';

@Component({
  selector: 'app-home-page',
  imports: [Card, Pagination],
  templateUrl: './home-page.html',
})
export class HomePage {
  productService = inject(ProductService);
  paginationService = inject(PaginationService);
  productResource = rxResource({
    params: () => ({ page: this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.productService.getProducts({
        offset: params.page * 9,
      });
    },
  });
}
