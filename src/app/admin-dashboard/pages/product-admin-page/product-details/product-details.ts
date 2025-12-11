import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Gender, Product, Tag } from '@products/interfaces/product.interface';
import { Carrousel } from '@products/components/carrousel/carrousel';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@shared/utils/form-utils';
import { FormErrorLabel } from '../form-error-label/form-error-label';
import { ProductService } from '@products/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'product-details',
  imports: [Carrousel, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  gender = Gender;
  product = input.required<Product>();
  fb = inject(FormBuilder);
  router = inject(Router);
  productService = inject(ProductService);
  wasSaved = signal(false);
  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    tags: [''],
    gender: [this.gender.Men, [Validators.required, Validators.pattern(/gender|women|kid|unisex/)]],
  });
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  ngOnInit(): void {
    // this.productForm.reset(this.product() as any);
    this.setFormValue(this.product());
  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.patchValue(formLike as any);
    this.productForm.patchValue({ tags: formLike.tags?.join(',') });
  }

  onSizeChanges(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];
    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1);
    } else {
      currentSizes.push(size);
    }

    this.productForm.patchValue({ sizes: currentSizes });
  }

  submit() {
    this.productForm.markAllAsTouched();
    const isValid = this.productForm.valid;
    if (!isValid) return;
    const productForm = this.productForm.value;
    const productLike: Partial<Product> = {
      ...(productForm as any),
      tags:
        productForm.tags
          ?.toLowerCase()
          .split(',')
          .map((tag) => tag.trim()) ?? [],
    };

    if (this.product().id === 'new') {
      this.productService.createProduct(productLike).subscribe((product) => {
        this.wasSaved.set(true);
        setTimeout(() => {
          this.wasSaved.set(false);
          this.router.navigate(['/admin/product', product.id]);
        }, 3000);
      });
    } else {
      this.productService.updateProductById(this.product().id, productLike).subscribe((product) => {
        this.wasSaved.set(true);
        setTimeout(() => {
          this.wasSaved.set(false);
        }, 3000);
      });
    }
  }
}
