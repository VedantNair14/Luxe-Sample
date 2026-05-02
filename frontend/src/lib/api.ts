import { Product, Category } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';

export async function fetchProducts(category?: string, featured?: boolean): Promise<Product[]> {
  const url = new URL(`${API_BASE_URL}/products`);
  if (category && category !== 'All') {
    url.searchParams.append('category', category);
  }
  if (featured !== undefined) {
    url.searchParams.append('featured', featured.toString());
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function fetchProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  return response.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
}
