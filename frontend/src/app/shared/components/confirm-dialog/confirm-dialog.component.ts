import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    
    <mat-dialog-actions align="end">
      <button 
        mat-button 
        (click)="onCancel()">
        {{ data.cancelText || 'Cancelar' }}
      </button>
      
      <button 
        mat-raised-button 
        color="warn" 
        (click)="onConfirm()">
        {{ data.confirmText || 'Confirmar' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      padding-top: 16px;
    }
    
    mat-dialog-actions button {
      margin-left: 8px;
    }
  `]
})
export class ConfirmDialogComponent {
  private dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  public data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}

