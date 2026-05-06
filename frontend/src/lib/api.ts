import { Product, Category } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8002';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Obsidian Cashmere Overcoat",
    description: "Architectural silhouette crafted from pure Mongolian cashmere. Featuring a structured shoulder and silk-satin lining.",
    price: 2450.00,
    image_url: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=3000",
    category: "Men",
    is_featured: true,
    tag: "Limited Edition"
  },
  {
    id: 2,
    name: "Ethereal Silk Gala Gown",
    description: "Flowing 100% mulberry silk gown with a hand-draped bodice. A masterpiece of movement and light.",
    price: 3800.00,
    image_url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=3000",
    category: "Women",
    is_featured: true,
    tag: "Couture"
  },
  {
    id: 3,
    name: "Heritage Calfskin Chelsea",
    description: "Hand-burnished Italian calfskin boots with a seamless construction. Sculpted last and custom stacked leather heel.",
    price: 890.00,
    image_url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=3000",
    category: "Shoes",
    is_featured: true,
    tag: "Craftsman"
  },
  {
    id: 4,
    name: "Horizon Chronograph",
    description: "Precision-engineered timepiece featuring a brushed titanium case and deep sapphire crystal.",
    price: 5200.00,
    image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=3000",
    category: "Accessories",
    is_featured: true,
    tag: "Precision"
  },
  {
    id: 5,
    name: "Ivory Merino Turtleneck",
    description: "Ultra-fine 18-gauge merino wool knit. A versatile foundation piece with a tailored fit.",
    price: 420.00,
    image_url: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=3000",
    category: "Men",
    is_featured: false,
    tag: "Essential"
  },
  {
    id: 6,
    name: "Midnight Velvet Blazer",
    description: "Deep navy velvet blazer with silk peak lapels. A modern take on classic evening wear.",
    price: 1200.00,
    image_url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=3000",
    category: "Men",
    is_featured: true,
    tag: "New Season"
  }
];

export async function fetchProducts(category?: string, featured?: boolean): Promise<Product[]> {
  const getFilteredMockData = () => {
    return MOCK_PRODUCTS.filter(p => {
      if (category && category !== 'All' && p.category !== category) return false;
      if (featured !== undefined && p.is_featured !== featured) return false;
      return true;
    });
  };

  try {
    const url = new URL(`${API_BASE_URL}/products`);
    if (category && category !== 'All') {
      url.searchParams.append('category', category);
    }
    if (featured !== undefined) {
      url.searchParams.append('featured', featured.toString());
    }
    
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error();
    const data = await response.json();
    
    // If backend returns empty list, fallback to filtered mock data
    return (Array.isArray(data) && data.length > 0) ? data : getFilteredMockData();
  } catch (error) {
    console.warn("Backend unavailable, using premium mock data fallback.");
    return getFilteredMockData();
  }
}

export async function fetchProduct(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error();
    return response.json();
  } catch (error) {
    const mock = MOCK_PRODUCTS.find(p => p.id === id);
    if (mock) return mock;
    throw new Error('Failed to fetch product');
  }
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error();
    return response.json();
  } catch (error) {
    return [
      { id: 1, name: "Men" },
      { id: 2, name: "Women" },
      { id: 3, name: "Accessories" },
      { id: 4, name: "Shoes" }
    ];
  }
}
