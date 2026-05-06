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
  tag?: string;
}

export interface MappedProduct extends Product {
  image: string;
  isNew: boolean;
  sizes: string[];
  images: string[];
}

export interface Category {
  id: number;
  name: string;
}
