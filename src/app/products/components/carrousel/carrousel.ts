import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { ProductImgPipe } from '../../pipes/product-images-pipe';

@Component({
  selector: 'app-carrousel',
  imports: [ProductImgPipe],
  templateUrl: './carrousel.html',
})
export class Carrousel implements AfterViewInit {
  images = input.required<string[]>();
  swiperDiv = viewChild.required<ElementRef>('swiperDiv');
  ngAfterViewInit() {
    const element = this.swiperDiv().nativeElement;
    if (!element) return;

    const swiper = new Swiper(element, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      modules: [Navigation, Pagination],
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
