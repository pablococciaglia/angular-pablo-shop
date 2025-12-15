import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'productImg',
})
export class ProductImgPipe implements PipeTransform {
  baseUrl = environment.baseUrl;
  transform(value: null | string | string[]): string {
    if (!value) {
      return './assets/images/no-image.jpg';
    }
    if (typeof value === 'string' && value.startsWith('blob:')) {
      return value;
    }
    if (typeof value === 'string') {
      return `${this.baseUrl}/files/product/${value}`;
    }
    const image = value.at(0);
    if (!image) {
      return './assets/images/no-image.jpg';
    }
    return `${this.baseUrl}/files/product/${image}`;
  }
}
