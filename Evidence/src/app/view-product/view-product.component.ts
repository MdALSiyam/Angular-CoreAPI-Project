import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../service/product.service';
import { ProductCategory } from '../models/product-category';

@Component({
  selector: 'app-view-product',
  imports: [CommonModule, RouterLink],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit {

  constructor(private service: ProductService){}
  list: ProductCategory[]=[]

  ngOnInit(): void {
    this.getList()
  }

  getList(){
    this.service.getProduct().subscribe((data)=>(this.list=data))
  }

  onDelete(category: ProductCategory){
    this.service.deleteProduct(category.productCategoryID).subscribe((data)=>this.getList())
  }
}
