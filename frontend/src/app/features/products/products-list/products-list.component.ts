import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductsService } from '../products.service';
import { Product } from '../../../shared/models/product.model';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  private productsService = inject(ProductsService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  products$ = this.productsService.products$;
  loading$ = this.productsService.loading$;
  displayedColumns: string[] = ['id', 'name', 'price', 'stock', 'actions'];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.loadProducts();
  }

  createProduct(): void {
    this.router.navigate(['/products/new']);
  }

  editProduct(product: Product): void {
    this.router.navigate(['/products', product.id, 'edit']);
  }

  deleteProduct(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirmar Exclusão',
        message: `Tem certeza que deseja excluir o produto "${product.name}"?`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed && product.id) {
        this.productsService.deleteProduct(product.id).subscribe({
          next: () => {
            this.snackBar.open('Produto excluído com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          },
          error: (error) => {
            this.snackBar.open(`Erro ao excluir produto: ${error.message}`, 'Fechar', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          }
        });
      }
    });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }
}

