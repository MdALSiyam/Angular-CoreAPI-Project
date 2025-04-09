import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductCategory } from '../models/product-category';

type NewType = ProductCategory;

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  productList: Product[] = [];
  productCategoryList: NewType[] = [];
  productObject: Product = {
    productID: 0,
    name: '',
    productNumber: '',
    color: '',
    standardCost: 0,
    listPrice: 0,
    weight: 0,
    size: 0,
  };
  productCateObj: ProductCategory = {
    name: '',
    productCategoryID: 0,
    products: [],
  };
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');
        if (id) {
          this.service.getCategoryAndProductById(Number(id)).subscribe({
            next: (res) => {
              this.productList = res.products;
              this.productCateObj = {
                productCategoryID: res.productCategoryID,
                name: res.name,
                products: this.productList,
              };
            },
          });
        }
      },
    });
  }
  deleteProduct(p: Product, arry: any[]) {
    const row = arry.findIndex(
      (obj) =>
        obj.name == p.name &&
        obj.color == p.color &&
        obj.productNumber == p.productNumber
    );
    if (row > -1) {
      arry.splice(row, 1);
    }
  }
  addProduct() {
    if (this.productObject.name != '' && this.productObject.name != null) {
      var expr = JSON.stringify(this.productObject);
      var obj = JSON.parse(expr);
      this.productList.unshift(obj);
      this.productObject = {
        productID: 0,
        name: '',
        productNumber: '',
        color: '',
        standardCost: 0,
        listPrice: 0,
        weight: 0,
        size: 0,
      };
    }
  }

  updateCategory() {
    this.service
      .updateCategoryWithProduct(
        this.productCateObj.productCategoryID,
        this.productCateObj
      )
      .subscribe({
        next: () => {
          this.router.navigate(['products']);
        },
      });
  }
}
