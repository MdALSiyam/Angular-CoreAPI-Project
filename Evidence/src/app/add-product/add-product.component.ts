import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductCategory } from '../models/product-category';
import { ProductService } from '../service/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

    constructor(private service: ProductService, private router: Router, fb: FormBuilder){}

    ngOnInit(): void {
      // throw new Error('Method not implemented.');
    }

    categoryList: ProductCategory[]=[]
    productList: Product[]=[]

    categoryObj = {
      productCategoryID: 0,
      name: '',
      products: []
    }

    productObj = {
      productID: 0,
      name:'',
      productNumber: '',
      color:'',
      standardCost: 0,
      listPrice: 0,
      size: 0,
      weight: 0,
    }

    deleteProduct(p: Product, arry: any[]){
      const row = arry.findIndex(
        (obj)=> obj.name==p.name && obj.productNumber==p.productNumber && obj.color==p.color)
        if(row>-1){
          arry.splice(row,1)
        }
    }
  
    addProduct(){
      if(this.productObj.name!='' && this.productObj.name!=null){
        var exp = JSON.stringify(this.productObj)
        var obj = JSON.parse(exp)
        this.productList.unshift(obj)
        this.productObj = {
          productID: 0,
          name:'',
          productNumber: '',
          color:'',
          standardCost: 0,
          listPrice: 0,
          size: 0,
          weight: 0,
        }
      }
    }

    addCategory(){
      const category: ProductCategory = {
        productCategoryID: this.categoryObj.productCategoryID,
        name: this.categoryObj.name,
        products: this.productList
      }
      this.service.postProduct(category).subscribe({
        next: (x)=> {
          console.log(x);
          this.router.navigate([`products`])
        }
      })
    }
  }
