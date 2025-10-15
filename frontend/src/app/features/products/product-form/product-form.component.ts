import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductsService } from '../products.service';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private productsService = inject(ProductsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  
  productForm!: FormGroup;
  
  isEditMode = false;
  isLoading = false;
  productId: number | null = null;
  
  get pageTitle(): string {
    return this.isEditMode ? 'Editar Produto' : 'Novo Produto';
  }
  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }
  private initializeForm(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(500)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
  }
  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id && id !== 'new') {
      this.isEditMode = true;
      this.productId = parseInt(id, 10);
      this.loadProduct(this.productId);
    }
  }
  private loadProduct(id: number): void {
    this.isLoading = true;
    
    this.productsService.getProductById(id).subscribe({
      next: (product) => {
        this.productForm.patchValue({
          name: product.name,
          description: product.description || '',
          price: product.price,
          stock: product.stock,
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open(`Erro ao carregar produto: ${error.message}`, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.isLoading = false;
        this.goBack();
      }
    });
  }
  onSubmit(): void {
    if (this.productForm.invalid) {
      this.markFormGroupTouched(this.productForm);
      return;
    }

    this.isLoading = true;
    const productData = this.productForm.value as Omit<Product, 'id'>;

    if (this.isEditMode && this.productId) {
      this.updateProduct(this.productId, productData);
    } else {
      this.createProduct(productData);
    }
  }
  private createProduct(productData: Omit<Product, 'id'>): void {
    this.productsService.createProduct(productData).subscribe({
      next: () => {
        this.snackBar.open('Produto criado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.isLoading = false;
        this.goBack();
      },
      error: (error) => {
        this.snackBar.open(`Erro ao criar produto: ${error.message}`, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.isLoading = false;
      }
    });
  }
  private updateProduct(id: number, productData: Omit<Product, 'id'>): void {
    this.productsService.updateProduct(id, productData).subscribe({
      next: () => {
        this.snackBar.open('Produto atualizado com sucesso!', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.isLoading = false;
        this.goBack();
      },
      error: (error) => {
        this.snackBar.open(`Erro ao atualizar produto: ${error.message}`, 'Fechar', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.isLoading = false;
      }
    });
  }
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }
  goBack(): void {
    this.router.navigate(['/products']);
  }
  hasError(fieldName: string): boolean {
    const field = this.productForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
  getErrorMessage(fieldName: string): string {
    const field = this.productForm.get(fieldName);
    
    if (!field || !field.errors) {
      return '';
    }

    if (field.errors['required']) {
      return 'Campo obrigatório';
    }
    
    if (field.errors['minlength']) {
      const minLength = field.errors['minlength'].requiredLength;
      return `Mínimo de ${minLength} caracteres`;
    }
    
    if (field.errors['maxlength']) {
      const maxLength = field.errors['maxlength'].requiredLength;
      return `Máximo de ${maxLength} caracteres`;
    }
    
    if (field.errors['min']) {
      const min = field.errors['min'].min;
      return `Valor mínimo: ${min}`;
    }

    return 'Campo inválido';
  }
}

