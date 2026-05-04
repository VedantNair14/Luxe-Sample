import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);
        if (existingItem) {
          const updatedItems = items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          );
          set({ items: updatedItems, total: calculateTotal(updatedItems) });
        } else {
          const updatedItems = [...items, item];
          set({ items: updatedItems, total: calculateTotal(updatedItems) });
        }
      },
      removeItem: (id) => {
        const updatedItems = get().items.filter((i) => i.id !== id);
        set({ items: updatedItems, total: calculateTotal(updatedItems) });
      },
      updateQuantity: (id, quantity) => {
        const updatedItems = get().items.map((i) =>
          i.id === id ? { ...i, quantity } : i
        );
        set({ items: updatedItems, total: calculateTotal(updatedItems) });
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

const calculateTotal = (items: CartItem[]) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};

interface FavoritesStore {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) => {
        const current = get().favorites;
        if (current.includes(id)) {
          set({ favorites: current.filter((favId) => favId !== id) });
        } else {
          set({ favorites: [...current, id] });
        }
      },
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: 'favorites-storage',
    }
  )
);
