'use client';

import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Category } from '@/types';

const categories: { value: Category; label: string }[] = [
  { value: 'electronics', label: '📱 Electronics' },
  { value: 'audio', label: '🎧 Audio' },
  { value: 'gaming', label: '🎮 Gaming' },
  { value: 'tablets', label: '📟 Tablets' },
  { value: 'wearables', label: '⌚ Wearables' }
];

export default function CreateProductPage() {
  const { addProduct } = useStore();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: 'electronics' as Category
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.category) newErrors.category = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      addProduct({
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        image: formData.image,
        category: formData.category
      });
      
      router.push('/products');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Очищаем ошибку при вводе
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center mb-6">
        <Link 
          href="/products"
          className="text-blue-400 hover:text-blue-300 mr-4 transition-colors"
        >
          ← Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-white">Create New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 text-white ${
              errors.title 
                ? 'bg-red-900/50 border border-red-500 focus:ring-red-500' 
                : 'bg-gray-700 border border-gray-600 focus:ring-blue-500'
            }`}
            placeholder="Enter product title"
          />
          {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 text-white ${
              errors.description 
                ? 'bg-red-900/50 border border-red-500 focus:ring-red-500' 
                : 'bg-gray-700 border border-gray-600 focus:ring-blue-500'
            }`}
            placeholder="Enter product description"
          />
          {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">
            Price *
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 text-white ${
              errors.price 
                ? 'bg-red-900/50 border border-red-500 focus:ring-red-500' 
                : 'bg-gray-700 border border-gray-600 focus:ring-blue-500'
            }`}
            placeholder="Enter price"
            step="0.01"
          />
          {errors.price && <p className="text-red-400 text-sm mt-1">{errors.price}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-2">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 text-white ${
              errors.category 
                ? 'bg-red-900/50 border border-red-500 focus:ring-red-500' 
                : 'bg-gray-700 border border-gray-600 focus:ring-blue-500'
            }`}
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-400 text-sm mt-1">{errors.category}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-200 text-sm font-bold mb-2">
            Image URL *
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={`w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 text-white ${
              errors.image 
                ? 'bg-red-900/50 border border-red-500 focus:ring-red-500' 
                : 'bg-gray-700 border border-gray-600 focus:ring-blue-500'
            }`}
            placeholder="Enter image URL"
          />
          {errors.image && <p className="text-red-400 text-sm mt-1">{errors.image}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}