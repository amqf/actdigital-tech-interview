import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadComponent: () => 
      import('./features/products/products-list/products-list.component')
        .then(m => m.ProductsListComponent),
    title: 'Produtos'
  },
  {
    path: 'products/new',
    loadComponent: () => 
      import('./features/products/product-form/product-form.component')
        .then(m => m.ProductFormComponent),
    title: 'Novo Produto'
  },
  {
    path: 'products/:id/edit',
    loadComponent: () => 
      import('./features/products/product-form/product-form.component')
        .then(m => m.ProductFormComponent),
    title: 'Editar Produto'
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];

