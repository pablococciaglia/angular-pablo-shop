import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImgPipe } from '@products/pipes/product-images-pipe';

@Component({
  selector: 'products-table',
  imports: [ProductImgPipe, RouterLink, CurrencyPipe],
  templateUrl: './products-table.html',
})
export class ProductsTable {
  products = input.required<Product[]>();
}
