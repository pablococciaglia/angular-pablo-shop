import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/product.service';
import { Card } from '@products/components/card/card';
import { map } from 'rxjs';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { Pagination } from '@shared/components/pagination/pagination';

@Component({
  selector: 'app-gender-page',
  imports: [Card, Pagination],
  templateUrl: './gender-page.html',
})
export class GenderPage {
  router = inject(ActivatedRoute);
  productService = inject(ProductService);
  gender = toSignal(this.router.params.pipe(map(({ gender }) => gender)));
  paginationService = inject(PaginationService);

  productResource = rxResource({
    params: () => ({
      gender: this.gender(),
      page: this.paginationService.currentPage() - 1,
    }),
    stream: ({ params }) => {
      return this.productService.getProducts({ gender: params.gender, offset: params.page * 9 });
    },
  });
}
