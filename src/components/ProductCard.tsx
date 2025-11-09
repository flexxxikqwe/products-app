'use client';

import { Product } from '@/types';
import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleLike, deleteProduct } = useStore();
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    router.push(`/products/${product.id}`);
  };

  const truncatedDescription = product.description.length > 100 
    ? `${product.description.substring(0, 100)}...` 
    : product.description;

  // Функция для красивого отображения категории
  const getCategoryDisplay = (category: string) => {
    const categoryMap: { [key: string]: { label: string; emoji: string; color: string } } = {
      electronics: { label: 'Electronics', emoji: '📱', color: 'bg-blue-900/30 text-blue-400' },
      audio: { label: 'Audio', emoji: '🎧', color: 'bg-purple-900/30 text-purple-400' },
      gaming: { label: 'Gaming', emoji: '🎮', color: 'bg-green-900/30 text-green-400' },
      tablets: { label: 'Tablets', emoji: '📟', color: 'bg-yellow-900/30 text-yellow-400' },
      wearables: { label: 'Wearables', emoji: '⌚', color: 'bg-red-900/30 text-red-400' }
    };

    return categoryMap[category] || { label: category, emoji: '📦', color: 'bg-gray-700 text-gray-300' };
  };

  // Функция для генерации качественных placeholder изображений
  const getProductImage = (product: Product) => {
    // Если есть изображение и оно не пустое - используем его
    if (product.image && product.image.trim() !== '') {
      return product.image;
    }
    
    // Используем разные сервисы в зависимости от ID продукта для разнообразия
    const serviceIndex = product.id % 3;
    
    switch(serviceIndex) {
      case 0:
        // Imgix - качественные изображения
        const imgixImages = [
          'kingfisher', 'butterfly', 'bear', 'elephant', 'turtle',
          'whale', 'fox', 'wolf', 'lion', 'tiger'
        ];
        const imgixImage = imgixImages[product.id % imgixImages.length];
        return `https://assets.imgix.net/examples/${imgixImage}.jpg?w=400&h=300&fit=crop&auto=format`;
      
      case 1:
        // Cloudinary - разные изображения
        const cloudinaryImages = [
          'sample', 'woman', 'man', 'cat', 'dog',
          'balloons', 'chinese-food', 'pizza', 'car', 'bike'
        ];
        const cloudinaryImage = cloudinaryImages[product.id % cloudinaryImages.length];
        return `https://res.cloudinary.com/demo/image/upload/w_400,h_300,c_fill/${cloudinaryImage}.jpg`;
      
      case 2:
        // Dummyimage - цветные placeholder с текстом
        const colors = [
          '4A90E2/ffffff', '50E3C2/000000', 'B8E986/000000', 
          'BD10E0/ffffff', '9013FE/ffffff', '417505/ffffff',
          '7ED321/000000', 'F5A623/000000', 'D0021B/ffffff'
        ];
        const color = colors[product.id % colors.length];
        const text = product.title.substring(0, 12).replace(/\s+/g, '+');
        return `https://dummyimage.com/400x300/${color}&text=${text}`;
      
      default:
        return `https://dummyimage.com/400x300/4A90E2/ffffff&text=Product+${product.id}`;
    }
  };

  const categoryInfo = getCategoryDisplay(product.category);
  const productImage = getProductImage(product);

  return (
    <div 
      className="bg-gray-800 rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img 
          src={productImage}
          alt={product.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLike(product.id);
            }}
            className={`p-2 rounded-full backdrop-blur-sm ${
              product.isLiked 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-gray-900/80 text-gray-300 hover:bg-gray-800'
            } shadow-md hover:scale-110 transition-all duration-200`}
          >
            {product.isLiked ? '❤️' : '🤍'}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteProduct(product.id);
            }}
            className="p-2 bg-gray-900/80 text-gray-300 rounded-full backdrop-blur-sm shadow-md hover:scale-110 hover:bg-red-600 hover:text-white transition-all duration-200"
          >
            🗑️
          </button>
        </div>
        
        {/* Бейдж категории на изображении */}
        <div className={`absolute top-3 left-3 ${categoryInfo.color} px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm`}>
          <span className="mr-1">{categoryInfo.emoji}</span>
          {categoryInfo.label}
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-white">{product.title}</h3>
        <p className="text-gray-400 mt-2 text-sm leading-relaxed">{truncatedDescription}</p>
        
        <div className="flex justify-between items-center mt-3">
          <p className="text-green-400 font-bold text-lg">${product.price}</p>
          
          {/* Дополнительный бейдж категории под описанием */}
          <span className={`${categoryInfo.color} px-2 py-1 rounded-full text-xs font-medium`}>
            {categoryInfo.emoji} {categoryInfo.label}
          </span>
        </div>
      </div>
    </div>
  );
}