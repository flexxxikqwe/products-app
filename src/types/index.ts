export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isLiked?: boolean;
}

export interface CreateProductForm {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export type Category = 'all' | 'electronics' | 'audio' | 'gaming' | 'tablets' | 'wearables';