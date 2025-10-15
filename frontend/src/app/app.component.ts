import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-toolbar color="primary">
      <a routerLink="/" class="logo">
        <mat-icon>shopping_cart</mat-icon>
        <img 
          src="assets/logo-act.svg" 
          alt="ACTDigital Logo" 
          class="logo-img"
        > Entrevista Técnica
      </a>
      <span class="spacer"></span>
      <button 
        mat-button 
        routerLink="/products"
        routerLinkActive="active">
        <mat-icon>inventory_2</mat-icon>
        Produtos
      </button>
    </mat-toolbar>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    mat-toolbar {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      z-index: 1000;

      .logo {
        display: flex;
        align-items: center;
        gap: 8px;
        color: white;
        text-decoration: none;
        font-size: 20px;
        font-weight: 500;
        cursor: pointer;

        mat-icon {
          font-size: 28px;
          width: 28px;
          height: 28px;
        }

        &:hover {
          opacity: 0.9;
        }
      }

      .spacer {
        flex: 1 1 auto;
      }

      button.active {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }

    main {
      flex: 1;
      overflow-y: auto;
      background-color: #f5f5f5;
    }

    @media (max-width: 600px) {
      mat-toolbar {
        .logo span {
          display: none;
        }
      }
    }
  `]
})
export class AppComponent {
  title = 'CRUD de Produtos';
}

