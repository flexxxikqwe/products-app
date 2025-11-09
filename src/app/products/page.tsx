'use client';

import { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import ProductCard from '../../components/ProductCard';
import Link from 'next/link';
import { Category } from '@/types';

// Начальные продукты с реальными изображениями
const initialProducts = [
  // Электроника
  {
    id: 1,
    title: "iPhone 15 Pro",
    description: "The ultimate iPhone with titanium design, powerful A17 Pro chip, and advanced camera system for professional photography.",
    price: 1199,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692846359313",
    category: "electronics",
    isLiked: false
  },
  {
    id: 2,
    title: "MacBook Pro 16\"",
    description: "Supercharged by M3 Pro chip for exceptional performance. Perfect for developers, designers, and creative professionals.",
    price: 2499,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-silver-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673221",
    category: "electronics",
    isLiked: false
  },
  {
    id: 3,
    title: "Samsung Galaxy S24",
    description: "AI-powered smartphone with professional-grade camera, long battery life, and stunning display.",
    price: 899,
    image: "https://images.samsung.com/is/image/samsung/p6pim/ru/2401/gallery/ru-galaxy-s24-s928-sm-s928bzkjerc-539223379",
    category: "electronics",
    isLiked: false
  },
  // Аудио
  {
    id: 4,
    title: "AirPods Max",
    description: "High-fidelity audio with Active Noise Cancellation and spatial audio for an immersive listening experience.",
    price: 549,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-hero-select-202011?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1633629858000",
    category: "audio",
    isLiked: false
  },
  {
    id: 5,
    title: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation with exceptional sound quality and 30-hour battery life.",
    price: 399,
    image: "https://www.sony.ru/image/5a6b6d3b6c4c6d2b6c4c6d2b6c4c6d2b?fmt=pjpeg&wid=1200&hei=675&bgcolor=F1F5F9&bgc=F1F5F9",
    category: "audio",
    isLiked: false
  },
  // Игровые консоли
  {
    id: 6,
    title: "PlayStation 5",
    description: "Next-gen gaming console with lightning-fast loading, haptic feedback, and 4K graphics.",
    price: 499,
    image: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$1600px--t$",
    category: "gaming",
    isLiked: false
  },
  {
    id: 7,
    title: "Nintendo Switch OLED",
    description: "Handheld gaming console with vibrant OLED screen and versatile play modes for gaming anywhere.",
    price: 349,
    image: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/SUQxWmVwU2VyaWVzRGV2aWNlX1N0dWRpb18wMV82NTAweDM2NT8idD1lZjUyYjUzOS1mYzQ3LTQ4YzUtOTQ0ZS1hZWI2YzM0YjY0ZmImwidz02NTAmImg9MzY1",
    category: "gaming",
    isLiked: false
  },
  // Планшеты
  {
    id: 8,
    title: "iPad Pro",
    description: "Revolutionary M2 chip with stunning Liquid Retina XDR display. The ultimate iPad experience.",
    price: 1099,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-select-202212-12-9inch-spacegray-wifi_FMT_WHH?wid=1280&hei=720&fmt=p-jpg&qlt=95&.v=1671144653320",
    category: "tablets",
    isLiked: false
  },
  {
    id: 9,
    title: "Samsung Galaxy Tab S9",
    description: "Powerful Android tablet for work and entertainment with S Pen included.",
    price: 649,
    image: "https://images.samsung.com/is/image/samsung/p6pim/ru/2307/gallery/ru-galaxy-tab-s9-5g-sm-x716-sm-x716bzacec-536717793",
    category: "tablets",
    isLiked: false
  },
  // Носимые устройства
  {
    id: 10,
    title: "Apple Watch Ultra",
    description: "The most rugged and capable Apple Watch with advanced fitness features and extreme sports tracking.",
    price: 799,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTDV3ref_VW_34FR+watch-49-titanium-ultra2_VW_34FR_WF_CO+watch-face-49-alpine-ultra2_VW_34FR_WF_CO?wid=2000&hei=2000&fmt=png&qlt=95&.v=3",
    category: "wearables",
    isLiked: false
  },
  {
    id: 11,
    title: "Samsung Galaxy Watch 6",
    description: "Elegant smartwatch with comprehensive health tracking and long battery life.",
    price: 299,
    image: "https://images.samsung.com/is/image/samsung/p6pim/ru/2307/gallery/ru-galaxy-watch6-468854-sm-r930fzbaseu-536717793",
    category: "wearables",
    isLiked: false
  },
  {
    id: 12,
    title: "Xbox Series X",
    description: "Most powerful Xbox console with 4K gaming, 120 FPS, and quick resume feature.",
    price: 499,
    image: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Xbox-Series-X-Console-Front?wid=406&hei=230&fit=crop",
    category: "gaming",
    isLiked: false
  },
  {
    id: 13,
    title: "Bose QuietComfort 45",
    description: "Premium noise-cancelling headphones with balanced audio and comfortable fit.",
    price: 329,
    image: "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc45/product_silo_images/qc45_black_ec_01.psd/jcr:content/renditions/cq5dam.web.1280.1280.png",
    category: "audio",
    isLiked: false
  },
  {
    id: 14,
    title: "Google Pixel 8 Pro",
    description: "Advanced Android phone with exceptional camera and AI features.",
    price: 999,
    image: "https://store.google.com/static/product/image/pixel_8_pro_obsidian.png?hl=ru",
    category: "electronics",
    isLiked: false
  },
  {
    id: 15,
    title: "Microsoft Surface Laptop 5",
    description: "Sleek Windows laptop with touchscreen and premium build quality.",
    price: 1299,
    image: "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Surface-Laptop-5-13-5-Platinum-01-1?wid=406&hei=230&fit=crop",
    category: "electronics",
    isLiked: false
  }
];

const categories: { value: Category; label: string; emoji: string }[] = [
  { value: 'all', label: 'All Products', emoji: '📦' },
  { value: 'electronics', label: 'Electronics', emoji: '📱' },
  { value: 'audio', label: 'Audio', emoji: '🎧' },
  { value: 'gaming', label: 'Gaming', emoji: '🎮' },
  { value: 'tablets', label: 'Tablets', emoji: '📟' },
  { value: 'wearables', label: 'Wearables', emoji: '⌚' }
];

export default function ProductsPage() {
  const { products, likedFilter, selectedCategory, setLikedFilter, setCategory } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isInitialized, setIsInitialized] = useState(false);
  const itemsPerPage = 9;

  // Загрузка начальных данных (только один раз)
  useEffect(() => {
    if (!isInitialized && products.length === 0) {
      initialProducts.forEach(product => {
        useStore.getState().addProduct(product);
      });
      setIsInitialized(true);
    }
  }, [products.length, isInitialized]);

  // Фильтрация и поиск
  const filteredProducts = products.filter(product => {
    const matchesFilter = !likedFilter || product.isLiked;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesFilter && matchesSearch && matchesCategory;
  });

  // Пагинация
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (category: Category) => {
    setCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Our Products</h1>
        <Link 
          href="/create-product"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          + Add Product
        </Link>
      </div>

      {/* Фильтры и поиск */}
      <div className="space-y-4 mb-8">
        {/* Категории */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                selectedCategory === category.value 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span>{category.emoji}</span>
              {category.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4">
            <button
              onClick={() => {
                setLikedFilter(false);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg font-medium ${
                !likedFilter 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } transition-colors`}
            >
              All Products
            </button>
            <button
              onClick={() => {
                setLikedFilter(true);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg font-medium ${
                likedFilter 
                  ? 'bg-red-600 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } transition-colors`}
            >
              Liked ❤️
            </button>
          </div>
          
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Информация о фильтрах */}
      <div className="mb-6 text-gray-400">
        Showing {filteredProducts.length} of {products.length} products
        {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
        {likedFilter && ' (Liked)'}
        {searchTerm && ` matching "${searchTerm}"`}
      </div>

      {/* Список продуктов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-700 text-gray-300 rounded disabled:opacity-50 hover:bg-gray-600 transition-colors"
          >
            ←
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={`page-${page}`}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              } transition-colors`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-700 text-gray-300 rounded disabled:opacity-50 hover:bg-gray-600 transition-colors"
          >
            →
          </button>
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No products found</p>
          {likedFilter && (
            <p className="text-gray-500 mt-2">Try adding some products to favorites first!</p>
          )}
          {selectedCategory !== 'all' && (
            <p className="text-gray-500 mt-2">No products in this category</p>
          )}
        </div>
      )}
    </div>
  );
}