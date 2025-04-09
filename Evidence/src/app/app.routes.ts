import { Routes } from '@angular/router';
import { ViewProductComponent } from './view-product/view-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

export const routes: Routes = [
  {path: '', component: ViewProductComponent},
  {path: 'products', component: ViewProductComponent},
  {path: 'addProduct', component: AddProductComponent},
  {path: 'addproduct/edit/:id', component: EditProductComponent,},
];
