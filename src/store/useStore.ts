import { create } from 'zustand';
import { Product, CreateProductForm, Category } from '@/types';

interface StoreState {
  products: Product[];
  likedFilter: boolean;
  selectedCategory: Category;
  setLikedFilter: (filter: boolean) => void;
  setCategory: (category: Category) => void;
  toggleLike: (id: number) => void;
  deleteProduct: (id: number) => void;
  addProduct: (product: CreateProductForm) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  getNextId: () => number;
}

// Используем замыкание для сохранения nextId
const createStore = () => {
  let nextId = 11; // Начинаем с 11, так как у нас будет 10 начальных продуктов

  return create<StoreState>((set, get) => ({
    products: [],
    likedFilter: false,
    selectedCategory: 'all',
    
    setLikedFilter: (filter) => set({ likedFilter: filter }),
    
    setCategory: (category) => set({ selectedCategory: category }),
    
    toggleLike: (id) => set((state) => ({
      products: state.products.map(product =>
        product.id === id ? { ...product, isLiked: !product.isLiked } : product
      )
    })),
    
    deleteProduct: (id) => set((state) => ({
      products: state.products.filter(product => product.id !== id)
    })),
    
    addProduct: (productData) => set((state) => {
      const newProduct = {
        id: nextId++,
        ...productData,
        isLiked: false
      };
      return {
        products: [...state.products, newProduct]
      };
    }),
    
    updateProduct: (id, updatedData) => set((state) => ({
      products: state.products.map(product =>
        product.id === id ? { ...product, ...updatedData } : product
      )
    })),
    
    getNextId: () => {
      return nextId;
    }
  }));
};

export const useStore = createStore();