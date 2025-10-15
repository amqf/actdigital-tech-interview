export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

