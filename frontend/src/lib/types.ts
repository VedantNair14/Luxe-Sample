export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_featured: boolean;
  images?: string[];
  stock?: number;
}

export interface MappedProduct extends Product {
  image: string;
  isNew: boolean;
  sizes: string[];
}

export interface Category {
  id: number;
  name: string;
}
