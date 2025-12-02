import { SlicePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImgPipe } from '@products/pipes/product-images-pipe';

@Component({
  selector: 'app-card',
  imports: [RouterLink, SlicePipe, ProductImgPipe],
  templateUrl: './card.html',
})
export class Card {
  product = input.required<Product>();
}
